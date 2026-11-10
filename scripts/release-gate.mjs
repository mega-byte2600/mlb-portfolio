import {spawnSync} from 'node:child_process';

const checks=[
 ['frontend syntax', 'node', ['--check','app.js']],
 ['Worker regression and adversarial tests', 'npm', ['--prefix','ambassador','run','test:all']],
 ['static smoke tests', 'node', ['tests/smoke.test.js']],
 ['retrieval stress tests', 'node', ['ambassador/stress.mjs']]
];

for(const [label,command,args] of checks){
 console.log(`\n[release-gate] ${label}`);
 const result=spawnSync(command,args,{stdio:'inherit'});
 if(result.status!==0){
  console.error(`[release-gate] BLOCKED: ${label}`);
  process.exit(result.status||1);
 }
}
console.log('\n[release-gate] PASS');
