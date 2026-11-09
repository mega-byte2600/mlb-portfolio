'use strict';
// Real multi-turn AI client. Never embeds model tokens, evidence docs, or a mock answer engine.
// Configure endpoint in ambassador-config.js after deploying the Cloudflare Worker.
const endpoint=window.AMBASSADOR_API_URL||'';
const form=document.getElementById('ask-form');
const input=document.getElementById('ask-input');
const log=document.getElementById('chat-log');
const note=document.querySelector('.chat-note');
const history=[];
const submit=form.querySelector('button[type="submit"]');
const APPROVED_ACTION_URLS=new Set(['https://www.linkedin.com/in/bolton-2600/','https://mega-byte2600.github.io/hardball/dashboard/','https://mega-byte2600.github.io/mlb-portfolio/Michael_Bolton_Resume_Nov_2026.pdf']);
function append(message,klass,sources=[],action=null){
 const div=document.createElement('div');div.className='bubble '+klass;div.textContent=message;
 if(action&&typeof action==='object'){
  const type=action.type,url=action.url,label=action.label;
  const safeOpen=type==='open_url'&&APPROVED_ACTION_URLS.has(url);
  const safeEmail=type==='compose_email'&&typeof url==='string'&&url.startsWith('mailto:?subject=');
  if((safeOpen||safeEmail)&&typeof label==='string'){
   const button=document.createElement('button');button.type='button';button.className='action-button';button.textContent=label;
   button.addEventListener('click',()=>{
    if(safeEmail&&!window.confirm('Open a résumé email draft? You will choose the recipient and confirm sending in your email app.'))return;
    window.open(url,'_blank','noopener,noreferrer');
   });div.appendChild(button);
  }
 }
 if(sources.length){const list=document.createElement('div');list.className='source-list';const title=document.createElement('strong');title.textContent='Evidence consulted';list.append(title);
 for(const s of sources){const a=document.createElement('a');a.textContent=`[${s.id}] ${s.title} ↗`;a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';list.append(a);}div.appendChild(list)}
 log.appendChild(div);log.scrollTop=log.scrollHeight;
}
function status(message){if(note)note.textContent=message}
function showReferral(referral){
 if(!referral||typeof referral.url!=='string'||typeof referral.label!=='string')return;
 const url=referral.url;
 const approved=url.startsWith('https://github.com/mega-byte2600')||url.startsWith('https://www.linkedin.com/in/bolton-2600/')||url.startsWith('https://mega-byte2600.github.io/mlb-portfolio/')||url.startsWith('mailto:michael.bolton.ph@dartmouth.edu');
 if(!approved)return;
 const box=document.createElement('div');box.className='bubble bot';
 const a=document.createElement('a');a.href=url;a.textContent=referral.label+' ↗';a.rel='noopener noreferrer';a.target='_blank';box.append(a);log.append(box);log.scrollTop=log.scrollHeight;
}
async function reply(q){if(!q.trim()||submit.disabled)return;
 if(!endpoint){status('The AI service is not deployed yet. This demo does not fabricate answers.');return}
 append(q,'user');submit.disabled=true;input.disabled=true;status('Checking approved evidence…');
 try{
 const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q,history:history.slice(-6)})});
 if(!response.ok)throw new Error(`Service unavailable (${response.status})`);
 const data=await response.json();if(typeof data.answer!=='string')throw Error('Invalid service response');
 append(data.answer,'bot',Array.isArray(data.sources)?data.sources:[],data.action);
 if(!data.grounded&&data.referral)showReferral(data.referral);
 history.push({role:'user',content:q},{role:'assistant',content:data.answer});while(history.length>6)history.shift();
 status(data.grounded?'AI-generated synthesis; check cited evidence before relying on any claim.':'I could not verify this in approved evidence. Follow the suggested next step.');
 }catch(err){append('The AI Ambassador is temporarily unavailable. Please use the evidence ledger or contact Michael directly.','bot');status(String(err.message||err))}
 finally{submit.disabled=false;input.disabled=false;input.focus()}
}
form.addEventListener('submit',event=>{event.preventDefault();const q=input.value.trim();input.value='';reply(q)});
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>reply(b.dataset.question)));
if(!endpoint){submit.disabled=true;input.disabled=true;input.placeholder='AI Ambassador awaiting free Worker deployment';status('AI service not deployed. No simulated or keyword-only answers.');}
