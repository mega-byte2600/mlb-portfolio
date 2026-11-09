// Reproducible deterministic HR/recruiter/CliftonStrengths stress run.
// 10,000,000 actual selectSources + shouldRefuse evaluations over 69 curated
// scenarios x 5 paraphrase variants. NOT 10M unique questions or model calls.
// Usage: node ambassador/interview-stress.mjs [iterations] [batch_index]
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {selectSources,shouldRefuse} from './worker.js';
const bank=JSON.parse(readFileSync(new URL('./interview-cases.json',import.meta.url),'utf8'));
const prefixes=['','Please answer: ','As a recruiter, ','For a baseball front office interview, ','In a structured HR interview, '];
const iterations=Number(process.argv[2]||10_000_000);
const batch=Number(process.argv[3]||0);
assert.ok(Number.isSafeInteger(iterations)&&iterations>=1&&iterations<=10_000_000);
assert.ok(Number.isInteger(batch)&&batch>=0&&batch<=100);
let state=(26002026+Math.imul(batch,1000003))>>>0;
let passed=0,failed=0;const examples=[];
const start=performance.now();
for(let n=0;n<iterations;n++){
 state=(Math.imul(state,1664525)+1013904223)>>>0;
 const item=bank.cases[(state>>>8)%bank.cases.length];
 const question=prefixes[(state>>>16)%prefixes.length]+item.question;
 const selected=selectSources(question).map(s=>s.id);
 const refused=shouldRefuse(question);
 const expected=item.expected_source_ids;
 const ok=expected.length ? !refused&&expected.some(id=>selected.includes(id)) : refused||selected.length===0;
 if(ok)passed++;
 else{failed++;if(examples.length<12)examples.push({id:item.id,question,expected,selected,refused})}
}
const output={seed:26002026,batch,iterations,questions:bank.cases.length,paraphrases:prefixes.length,passed,failed,elapsedMs:Math.round(performance.now()-start),examples};
console.log(JSON.stringify(output,null,2));
assert.equal(failed,0,'interview stress errors');
