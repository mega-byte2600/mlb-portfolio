// Lightweight intent resolution inspired by Rasa-style examples and
// confidence-gated dialogue policies. It is deliberately dependency-free so
// it can run inside a Cloudflare Worker.
const STOP=new Set(['a','an','and','are','about','background','can','could','do','does','experience','for','he','how','i','is','me','of','tell','the','to','what','when','where','which','with','you','your','his','any','my']);
const CANONICAL=Object.freeze({
 apps:'application',app:'application',applications:'application',software:'application',systems:'application',system:'application',
 developer:'develop',developers:'develop',developed:'develop',developing:'develop',development:'develop',build:'develop',building:'develop',built:'develop',created:'develop',creating:'develop',engineering:'develop',
 degrees:'degree',credentials:'credential',academic:'education',schooling:'education',
 languages:'language',multilingual:'language',bilingual:'language',
 conflicts:'conflict',disagreement:'conflict',disagreements:'conflict',
 priorities:'priority',deadlines:'deadline',projects:'project'
});
const normalise=value=>(value.toLowerCase().match(/[\p{L}\p{N}]+/gu)||[])
 .filter(token=>token.length>2&&!STOP.has(token)).map(token=>CANONICAL[token]||token);

const INTENTS=Object.freeze([
 {name:'education',examples:['tell me about your education','what degrees does he have','describe his academic background','what credentials does Michael have']},
 {name:'application_experience',examples:['any experience developing applications','do you have development experience','what software has he built','what apps has Michael created','tell me about his technical projects']},
 {name:'healthcare_motivation',examples:['why did you choose healthcare','why healthcare','why work in healthcare','what led him to public health']},
 {name:'language_skills',examples:['what languages do you speak','do you speak foreign languages','is he fluent in Portuguese','what are his language skills']},
 {name:'interpersonal_conflict',examples:['how do you deal with interpersonal conflicts','how does he handle disagreement','how do you resolve conflict with a coworker']},
 {name:'competing_priorities',examples:['how do you manage competing priorities','how do you prioritize projects','what do you do when deadlines conflict']},
 {name:'mlb_motivation',examples:['why do you want to work at MLB','why baseball','why join a baseball organization']},
 {name:'strengths_blindspots',examples:['what are your strengths and weaknesses','what are his blind spots','which CliftonStrengths describe him']}
]);

function score(question,example){
 const q=new Set(normalise(question));
 const e=normalise(example);
 if(!e.length)return 0;
 const overlap=e.filter(token=>q.has(token)).length;
 const coverage=overlap/e.length;
 const queryCoverage=overlap/Math.max(q.size,1);
 return (coverage*0.65)+(queryCoverage*0.35);
}

function classifyIntent(question){
 const ranked=INTENTS.map(intent=>({intent,score:Math.max(...intent.examples.map(example=>score(question,example)))}))
  .sort((a,b)=>b.score-a.score);
 const best=ranked[0]||{intent:null,score:0};
 const second=ranked[1]?.score||0;
 return {name:best.score>=0.55?best.intent.name:null,confidence:Number(best.score.toFixed(3)),margin:Number((best.score-second).toFixed(3))};
}

export {INTENTS,classifyIntent,normalise};
