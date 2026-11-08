import test from 'node:test';
import assert from 'node:assert/strict';
import worker,{selectSources} from './worker.js';
import {SOURCES} from './sources.js';
const url='https://placeholder.workers.dev/';
const origin='https://mega-byte2600.github.io';
const send=(body,headers={})=>worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(body)}),{AI:{run:async(model,options)=>{assert.match(model,/glm-4.7-flash/);assert.equal(options.messages[0].role,'system');return {response:'Hardball supports roster decisions [S1].'};}}});
test('retrieves approved project evidence',()=>{assert.equal(selectSources('How does Hardball handle payroll?')[0].id,'S1')});
test('rejects unknown topic without model invocation',async()=>{const r=await send({question:'What is the secret passphrase of the jellyfish emperor?'});const d=await r.json();assert.equal(d.grounded,false);assert.equal(d.sources.length,0)});
test('returns cited AI answer from mocked model',async()=>{const r=await send({question:'What does Hardball do?'});const d=await r.json();assert.equal(r.status,200);assert.equal(d.grounded,true);assert.match(d.answer,/Hardball/);assert.equal(d.sources[0].id,'S1')});
test('rejects cross origin',async()=>{const r=await send({question:'Hardball'},{Origin:'https://attacker.example'});assert.equal(r.status,403)});
test('rejects oversized user input',async()=>{const r=await send({question:'a'.repeat(400)});assert.equal(r.status,400)});
test('server strips non-approved citation IDs',async()=>{const r=await worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({question:'Hardball'})}),{AI:{run:async()=>({response:'See fake claim [S999] and Hardball [S1].'})}});const d=await r.json();assert.doesNotMatch(d.answer,/S999/)});
test('does not call inference when no source matches',async()=>{const r=await worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({question:'galactic lobster circus?'})}),{AI:{run:async()=>{throw Error('should not be called')}}});assert.equal((await r.json()).grounded,false)});

test('extracts GLM chat completion content',async()=>{
 const r=await worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({question:'What is Hardball?'})}),{AI:{run:async(_model,opts)=>{
 assert.equal(opts.chat_template_kwargs.enable_thinking,false);
 assert.equal(opts.max_completion_tokens,750);
 return {choices:[{message:{content:'Hardball is a baseball analytics project [S1].',role:'assistant'}}]};
 }}});
 const d=await r.json();assert.equal(r.status,200);assert.equal(d.grounded,true);assert.match(d.answer,/analytics/);
});
test('fails closed when reasoning model returns null content',async()=>{
 const r=await worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({question:'Hardball'})}),{AI:{run:async()=>({choices:[{message:{content:null,reasoning_content:'private reasoning'}}]})}});
 assert.equal(r.status,502);assert.equal((await r.json()).error,'Empty AI response');
});

test('expanded public evidence retrieves critical recruiter topics',async()=>{
 for(const [q,id] of [
 ['How did Michael govern Eleos AI at the county?','S10'],
 ['What did Michael do for CDC Windows endpoints?','S11'],
 ['What was his experience with Auris robotic surgery?','S12'],
 ['What education credentials did he earn at University of Wyoming?','S13'],
 ['What is his LinkedIn professional profile?','S8'],
 ['Does he speak Brazilian Portuguese?','S14'],
 ['What is his Emporion financial research project?','S15']
 ]) assert.equal(selectSources(q)[0]?.id,id,q);
});
test('citation-only responses do not create sources from unapproved ids',async()=>{
 const r=await worker.fetch(new Request(url,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({question:'Hardball'})}),{AI:{run:async()=>({response:'Unsupported [S999].'})}});
 const d=await r.json();assert.equal(d.grounded,false);assert.deepEqual(d.sources,[]);
});

test('approved evidence records have unique IDs, stable HTTPS links and explicit status',()=>{
 assert.ok(SOURCES.length>=15);
 const seen=new Set();
 for(const s of SOURCES){
   assert.match(s.id,/^S\\d+$/);
   assert.ok(!seen.has(s.id),'duplicate source ID '+s.id);seen.add(s.id);
   assert.match(s.url,/^https:\\/\\//);
   assert.ok(s.title&&s.status&&s.facts&&s.terms);
   assert.ok(!/api[_-]?key|password\\s*[:=]|bearer\\s+[a-z0-9]/i.test(s.facts));
 }
});
