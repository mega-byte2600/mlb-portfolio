// BML: Build, Measure, Learn. Deterministic reproducible interview simulations.
// Matrix: 69 A/B/C/security scenarios x 5 paraphrase prefixes = 345 verified queries.
// 10M seeded draws sample the PREVALIDATED matrix (not 10M new model calls).
// Plus 250k actual source retrieval/refusal evaluations across those scenarios.
// No external AI inference; no model training or 10M unique questions.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {selectSources,shouldRefuse} from './worker.js';
const bank=JSON.parse(readFileSync(new URL('./interview-cases.json',import.meta.url),'utf8'));
const prefixes=['','Please answer: ','As a recruiter, ','For a baseball front office interview, ','In a structured HR interview, '];
const matrix=bank.cases.flatMap(example=>prefixes.map(prefix=>({example,question:prefix+example.question})));
function examine(item){
 const selected=selectSources(item.question).map(s=>s.id);
 const refused=shouldRefuse(item.question);
 const expected=item.example.expected_source_ids;
 return expected.length?!refused&&expected.some(id=>selected.includes(id)):refused||selected.length===0;
}
const failures=[];
for(const row of matrix){row.valid=examine(row);if(!row.valid)failures.push({id:row.example.id,question:row.question})}
assert.equal(failures.length,0,'Matrix invalid: '+JSON.stringify(failures.slice(0,8)));
const trials=10_000_000,directTrials=250_000;
let seed=26002026,drawPass=0,directPass=0;
const begin=performance.now();
for(let i=0;i<trials;i++){
 seed=(Math.imul(seed,1664525)+1013904223)>>>0;
 const row=matrix[(seed>>>8)%matrix.length];
 // Draws run an expected-outcome check using the previously verified matrix.
 if(row.valid)drawPass++;
}
const afterDraws=performance.now();
for(let i=0;i<directTrials;i++){
 seed=(Math.imul(seed,1664525)+1013904223)>>>0;
 if(examine(matrix[(seed>>>8)%matrix.length]))directPass++;
}
const result={seed:26002026,questionBank:bank.cases.length,phrasingVariants:prefixes.length,verifiedMatrix:matrix.length,
 draws:trials,drawPassed:drawPass,drawFailed:trials-drawPass,
 directCalls:directTrials,directPassed:directPass,directFailed:directTrials-directPass,
 drawElapsedMs:Math.round(afterDraws-begin),directElapsedMs:Math.round(performance.now()-afterDraws),
 caveats:['10M are seeded samples over 345 prevalidated cases, not 10M unique questions or full retrieval calls','250k calls execute actual selectSources and shouldRefuse logic','No live Cloudflare model inference or model weight training']};
console.log(JSON.stringify(result,null,2));
assert.equal(drawPass,trials,'seeded matrix draw failure');
assert.equal(directPass,directTrials,'direct Worker retrieval/refusal failure');
