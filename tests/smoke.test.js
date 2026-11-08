const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const html=read('index.html'),js=read('app.js'),css=read('styles.css'),readme=read('README.md'),ledger=read('evidence.html');
for(const id of ['main','hardball','evidence','players','ask','chat-log','ask-form','ask-input']) {
  assert.match(html,new RegExp('id="'+id+'"'),`missing #${id}`);
}
for(const local of ['styles.css','app.js']) {
  assert.ok(fs.existsSync(path.join(root,local)),`missing ${local}`);
  assert.match(html,new RegExp('(?:href|src)="'+local.replace('.','\.')+'"'));
}
assert.ok(fs.existsSync(path.join(root,'.nojekyll')));
assert.ok(!fs.existsSync(path.join(root,'render.yaml')));
assert.match(readme,/GitHub Pages only/);
assert.doesNotMatch(readme,/Deploy to Render/);
assert.match(html,/https:\/\/mega-byte2600\.github\.io\/hardball\/dashboard\//);
assert.match(html,/approximately \$250,000 in annual labor-capacity cost avoidance/);
assert.match(html,/final scoreboard not retained/);
assert.match(html,/not a deployed MLB program/);
assert.match(js,/deterministic/);
assert.match(js,/No external API calls|does not send messages to a server/);
assert.match(css,/prefers-reduced-motion/);
assert.match(html,/Skip to content/);
assert.doesNotMatch(html,/api[_-]?key|sk-proj-|ghp_/i);
assert.doesNotMatch(html,/(href|src)="\/(?!\/)/, 'Root-absolute paths break project Pages subpaths');
console.log('PASS: GitHub Pages paths, independent hosting, evidence scope and static accessibility checks');

assert.match(html,/href="evidence.html"/);
assert.match(ledger,/firsthand-reported/);
assert.match(ledger,/confidential and intentionally excluded/);
assert.match(ledger,/not been implemented or endorsed/);
assert.match(css,/@media\(max-width:760px\)\{\.site-header\{height:auto/);
for(const href of [...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1])) {
  if(!href.startsWith('http') && !href.startsWith('#')) assert.ok(fs.existsSync(path.join(root,href.split('#')[0])), 'broken local link '+href);
}
console.log('PASS: local links, mobile navigation, claim register and provenance safeguards');