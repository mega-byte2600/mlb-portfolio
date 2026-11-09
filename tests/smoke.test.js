const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const html=read('index.html'),js=read('app.js'),css=read('styles.css'),readme=read('README.md'),ledger=read('evidence.html');
for(const id of ['main','hardball','evidence','players','ask','chat-log','ask-form','ask-input']) {
  assert.match(html,new RegExp('id="'+id+'"'),`missing #${id}`);
}
for(const local of ['styles.css','app.js']) {
  assert.ok(fs.existsSync(path.join(root,local)),`missing ${local}`);
  assert.match(html,new RegExp('(?:href|src)="' + local.replace('.','\\.') + '(?:\\?[^"]+)?\\"'));
}
assert.ok(fs.existsSync(path.join(root,'.nojekyll')));
assert.ok(!fs.existsSync(path.join(root,'render.yaml')));
assert.match(readme,/GitHub Pages from/);
assert.doesNotMatch(readme,/Deploy to Render/);
assert.match(html,/https:\/\/mega-byte2600\.github\.io\/hardball\/dashboard\//);
assert.match(html,/approximately \$250,000 in annual labor-capacity cost avoidance/);
assert.match(html,/final scoreboard not retained/);
assert.match(html,/not a deployed MLB program/);
assert.match(js,/fetch\(endpoint/);
assert.match(js,/window\.AMBASSADOR_API_URL/);
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
  if(!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) assert.ok(fs.existsSync(path.join(root,href.split(/[?#]/)[0])), 'broken local link '+href);
}
console.log('PASS: local links, mobile navigation, claim register and provenance safeguards');

assert.match(html,/href="resume.html"/);
assert.match(html,/mailto:michael.bolton.ph@dartmouth.edu/);
assert.match(read("resume.html"),/Print \/ Save as PDF/);
console.log("PASS: recruiter résumé and contact endpoints");

assert.match(html,/AI Ambassador/);
assert.match(html,/ambassador-config\.js/);
assert.ok(fs.existsSync(path.join(root,'ambassador/worker.js')));
assert.ok(fs.existsSync(path.join(root,'ambassador/sources.js')));
assert.ok(fs.existsSync(path.join(root,'ambassador/wrangler.toml')));
assert.doesNotMatch(read('ambassador-config.js'),/sk-[A-Za-z0-9]{12,}/);
console.log('PASS: AI Ambassador integration and source boundaries');

const pdfName='Michael_Bolton_Resume_Nov_2026.pdf';
const avatarName='ambassador-avatar.png';
assert.ok(fs.existsSync(path.join(root,avatarName)),'user-provided illustrated avatar must exist');
const avatar=fs.readFileSync(path.join(root,avatarName));
assert.equal(avatar.subarray(0,8).toString('hex'),'89504e470d0a1a0a','avatar must be a PNG');
assert.match(html,/src="ambassador-avatar\.png"/);
assert.doesNotMatch(html,/Michael_S_Bolton_Baseball_RD_Resume\.pdf/,'obsolete abbreviated résumé may not be linked');
assert.ok(fs.existsSync(path.join(root,pdfName)),'downloadable PDF must exist');
const pdf=fs.readFileSync(path.join(root,pdfName));
assert.match(pdf.subarray(0,8).toString('ascii'),/^%PDF-1\.[0-9]/);
assert.ok(pdf.length>100000,'complete user-provided résumé must not be replaced with short generated PDF');
assert.equal(pdf.length,337704,'résumé bytes must match the supplied three-page PDF');
assert.equal(crypto.createHash('sha256').update(pdf).digest('hex'),'50b167559fa820e41476f03c913e4f154b086374212d89daaf5e403c055d36c1','résumé must match the supplied PDF exactly');
assert.equal(crypto.createHash('sha256').update(avatar).digest('hex'),'012f759e8e8339125d8750d90d07d6d94e6d4820571c106b2e9bdab7084b7bf4','avatar must match the supplied illustration exactly');
assert.match(html,/BASEBALL RESEARCH &amp; DEVELOPMENT ANALYST/);
assert.match(html,/Proposed research rationale\.<\/strong> IF baseball organizations are provided with Hardball, an evidence informed approach connecting leadership with player and family perspectives/);
assert.doesNotMatch(html,/I am a scientist/,'portfolio must not make an unapproved scientist identity claim');
assert.match(html,/class="role-proof"/);
assert.equal((html.match(/data-question=/g)||[]).length,4,'four recruiter chat questions required');
assert.match(html,new RegExp('href="'+pdfName.replace('.','\\.')+'" download'));
assert.match(read('resume.html'),/Download Michael’s Résumé \(PDF\)/);
assert.match(html,/Download Michael’s Résumé \(PDF\)/);
assert.doesNotMatch(html,/onerror=.*ambassador-avatar/,'required portrait must not silently disappear when the asset is missing');
assert.match(html,/class="chat-head"><div>[\s\S]*class="ambassador-avatar"/,'portrait must follow the ambassador heading in the header markup');
assert.match(css,/\.ambassador-avatar\{[^}]*width:88px[^}]*height:88px[^}]*margin-left:auto/,'portrait must be a right-aligned responsive header asset');
assert.match(css,/\.chat-head>div\{min-width:0;flex:1\}/,'ambassador header text must shrink before the portrait on mobile');
assert.match(html,/Contact Michael/);
const wrangler=read('ambassador/wrangler.toml'),worker=read('ambassador/worker.js');
assert.match(wrangler,/\[\[ratelimits\]\]/);
assert.match(wrangler,/\[observability\][\s\S]*enabled = false/);
assert.match(worker,/RATE_LIMITER/);
assert.match(worker,/I don't have verified information about that/);
console.log('PASS: locked recruiter acceptance basics, PDF, four prompts, and safety configuration');
