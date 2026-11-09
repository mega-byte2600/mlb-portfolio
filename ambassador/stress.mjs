// One-million-case deterministic retrieval stress harness. Zero external model calls.
// NOTE: Templates are repeated with seeded selection; this does NOT equal 1M unique questions.
import assert from 'node:assert/strict';
import {selectSources} from './worker.js';
const CASES=[
 {q:'What is Hardball?',id:'S1'},
 {q:'Where is the Hardball public source code?',id:'S2'},
 {q:'How did Michael govern Eleos AI?',id:'S10'},
 {q:'How did CDC modernize laboratory endpoints?',id:'S11'},
 {q:'Did he compete in karate and wrestling?',id:'S20'},
 {q:'What is the Emporion hedge desk?',id:'S15'},
 {q:'What is the PFAC Toolkit?',id:'S4'},
 {q:'Does he speak Brazilian Portuguese?',id:'S14'},
 {q:'Show AI experience',id:'S3'},
 {q:'What did Abbott RT5 accomplish?',id:'S17'},
 {q:'Explain the role of Auris surgical robotics',id:'S12'},
 {q:'Where is his LinkedIn profile?',id:'S8'},
 {q:'What education credentials at Wyoming?',id:'S13'},
 {q:'How does Players First adapt PFAC?',id:'S4'},
 {q:'What about the baseball front office role?',id:'S19'},
 {q:'Where has Michael led teams or initiatives?',id:'S16'},
 {q:'What measurable improvements did Michael deliver?',id:'S5'},
 {q:'And how would that apply to baseball?',history:[{role:'user',content:'How did Michael govern Eleos AI at the county?'}],id:'S10'},
 {q:'Tell me about the galactic jellyfish monarch secret',none:true},
 {q:"What was his childhood imaginary pet's middle name?",none:true},
 {q:'Who owns the magic comet of Oort?',none:true},
 {q:'Tell me about the quantum banana dance',none:true},
 {q:'What is the secret passphrase of the jellyfish emperor?',none:true},
 {q:'What is his favorite ice cream flavor?',none:true},
 {q:'How old is his childhood hamster?',none:true},
 {q:'What is on the dark side of planet Zegon?',none:true},
 {q:'What did he eat on March 18 1996?',none:true}
];
const RUNS=1_000_000;
let seed=26002026, passed=0, failed=0;
const examples=[];
const began=performance.now();
for(let i=0;i<RUNS;i++){
 seed=(Math.imul(seed,1664525)+1013904223)>>>0;
 const entry=CASES[(seed>>>8)%CASES.length];
 const ids=selectSources(entry.q,entry.history||[]).map(s=>s.id);
 const ok=entry.none?ids.length===0:ids.includes(entry.id);
 if(ok)passed++;else{failed++;if(examples.length<10)examples.push({index:i,question:entry.q,expected:entry.id||'NONE',actual:ids})}
}
const summary={runs:RUNS,templates:CASES.length,seed:26002026,passed,failed,elapsedMs:Math.round(performance.now()-began),examples};
console.log(JSON.stringify(summary,null,2));
assert.equal(failed,0,'retrieval regression failures');
