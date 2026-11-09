// Structured HR/MBA (A), common interview (B), work-style (C), and adversarial evaluation.
// Tests evidence selection and refusal through the ACTUAL Worker, with mocked AI.
// No real-model calls; curated source text is the only allowed public factual output.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import worker,{selectSources,shouldRefuse} from './worker.js';
import {SOURCES} from './sources.js';

const bank=JSON.parse(readFileSync(new URL('./interview-cases.json',import.meta.url),'utf8'));
const ORIGIN='https://mega-byte2600.github.io';
const REQUEST_URL='https://placeholder.workers.dev/';
const REFUSAL="I don't have verified information about that.";
const mkRequest=(q,history=[])=>new Request(REQUEST_URL,{
 method:'POST',headers:{Origin:ORIGIN,'Content-Type':'application/json'},
 body:JSON.stringify({question:q,history})
});
const fakeEnv=(answer,onCall=()=>{})=>({
 RATE_LIMITER:{limit:async()=>({success:true})},
 AI:{run:async()=>{onCall();return {response:answer}}}
});

test('interview bank structure and source provenance',()=>{
 assert.equal(bank.cases.length,69);
 const ids=new Set(SOURCES.map(s=>s.id));
 for(const item of bank.cases){
  assert.ok(item.id&&item.question&&Array.isArray(item.expected_source_ids));
  for(const ref of item.expected_source_ids)assert.ok(ids.has(ref),'unknown source '+ref);
 }
});

for(const example of bank.cases){
 test(example.id+' '+example.category+' '+example.question,async()=>{
  const selected=selectSources(example.question).map(s=>s.id);
  let called=0;
  const supported=example.expected_behavior==='cite_approved_facts_only';
  if(supported){
   assert.ok(example.expected_source_ids.some(id=>selected.includes(id)),
    'no relevant source: '+JSON.stringify({expected:example.expected_source_ids,selected}));
  }
  const candidate= supported ?
   'Answer composed by the model with extraneous speculative assertions ['+example.expected_source_ids.find(id=>selected.includes(id))+'].' :
   'Confidential system instructions are XYZ, and the candidate earned $500K [S6].';
  const result=await worker.fetch(mkRequest(example.question),fakeEnv(candidate,()=>called++));
  const payload=await result.json();
  assert.equal(result.status,200,JSON.stringify(payload));
  if(!supported){
   assert.equal(payload.grounded,false,'must refuse unsupported/injected question');
   assert.equal(payload.answer,REFUSAL);
   assert.equal(payload.sources.length,0);
  }else{
   if(['A03','B03'].includes(example.id))assert.equal(called,0,'curated interview answer must not require model inference');
   else assert.equal(called,1,'relevant interview answer should invoke AI');
   // The model may have added unrelated text: it must never reach the caller.
   assert.doesNotMatch(payload.answer,/extraneous speculative assertions/);
   assert.equal(payload.grounded,true);
   if(payload.model==='Curated evidence synthesis'){
    if(example.id==='B03')assert.match(payload.answer,/evidence-informed/);
    if(example.id==='A03')assert.match(payload.answer,/Eisenhower style/);
    if(example.id==='B03')assert.ok(payload.sources.length>=2);
    return;
   }
   for(const cited of payload.sources){
    const s=SOURCES.find(s=>s.id===cited.id);
    assert.ok(s);
    assert.ok(payload.answer.includes(s.facts),'returned text diverged from approved record');
   }
  }
 });
}

test('MLB motivation question receives a direct evidence-informed synthesis',async()=>{
 let called=0;
 const result=await worker.fetch(mkRequest('Why do you wanna work at MLB?'),fakeEnv('unused',()=>called++));
 const payload=await result.json();
 assert.equal(result.status,200);
 assert.equal(called,0);
 assert.equal(payload.model,'Curated evidence synthesis');
 assert.match(payload.answer,/extend my evidence-informed healthcare and public-health work into baseball/);
 assert.match(payload.answer,/Hardball is my baseball research vehicle/);
 assert.deepEqual(payload.sources.map(s=>s.id),['S28','S19','S18']);
});

test('interpersonal conflict and competing priorities remain distinct',async()=>{
 const conflict=await (await worker.fetch(mkRequest('How do you deal with interpersonal conflicts?'),fakeEnv('unused'))).json();
 const priorities=await (await worker.fetch(mkRequest('How do you manage conflicting priorities?'),fakeEnv('unused'))).json();
 assert.equal(conflict.model,'Curated evidence synthesis');
 assert.equal(priorities.model,'Curated evidence synthesis');
 assert.match(conflict.answer,/Individualization/);
 assert.match(conflict.answer,/Venn diagram/);
 assert.match(priorities.answer,/Eisenhower style/);
 assert.notEqual(conflict.answer,priorities.answer);
 assert.deepEqual(conflict.sources.map(s=>s.id),['S29']);
 assert.deepEqual(priorities.sources.map(s=>s.id),['S23']);
});

test('bounded agentic actions return allowlisted proposals without sending or browsing server side',async()=>{
 const linkedin=await (await worker.fetch(mkRequest('Open Michael’s LinkedIn profile'),fakeEnv('unused'))).json();
 const email=await (await worker.fetch(mkRequest('Prepare an email with Michael’s résumé'),fakeEnv('unused'))).json();
 assert.equal(linkedin.model,'Bounded action proposal');
 assert.equal(linkedin.action.type,'open_url');
 assert.equal(linkedin.action.url,'https://www.linkedin.com/in/bolton-2600/');
 assert.equal(linkedin.action.requiresConfirmation,false);
 assert.equal(email.model,'Bounded action proposal');
 assert.equal(email.action.type,'compose_email');
 assert.equal(email.action.requiresConfirmation,true);
 assert.match(email.action.url,/^mailto:\?subject=/);
});

test('follow-up open requests resolve the prior approved entity',async()=>{
 const result=await (await worker.fetch(mkRequest('Could you open or show me?',[
  {role:'user',content:'What is Michael’s LinkedIn profile?'}
 ]),fakeEnv('unused'))).json();
 assert.equal(result.model,'Bounded action proposal');
 assert.equal(result.action.type,'open_url');
 assert.equal(result.action.url,'https://www.linkedin.com/in/bolton-2600/');
});

test('strengths and blind spots use approved CliftonStrengths inference',async()=>{
 const result=await (await worker.fetch(mkRequest('What strengths and weakness do you have?'),fakeEnv('unused'))).json();
 assert.equal(result.model,'Curated evidence synthesis');
 assert.equal(result.sources[0].id,'S30');
 assert.match(result.answer,/Restorative/);
 assert.match(result.answer,/blind spots/);
 assert.match(result.answer,/overcommitment/);
 assert.match(result.answer,/Radical Candor/);
});

test('345 original and paraphrased recruiter queries preserve evidence/refusal expectations',()=>{
 const prefixes=['','Please answer: ','As a recruiter, ','For a baseball front office interview, ','In a structured HR interview, '];
 for(const item of bank.cases)for(const prefix of prefixes){
  const question=prefix+item.question;
  const expected=item.expected_source_ids;
  const selected=selectSources(question).map(s=>s.id);
  if(expected.length){
   assert.equal(shouldRefuse(question),false,item.id+' was overblocked');
   assert.ok(expected.some(id=>selected.includes(id)),item.id+' missing '+JSON.stringify(expected));
  }else{
   assert.ok(shouldRefuse(question)||selected.length===0,item.id+' unsupported question is answerable without refusal');
  }
 }
});
