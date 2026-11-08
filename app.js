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
function append(message,klass,sources=[]){
 const div=document.createElement('div');div.className='bubble '+klass;div.textContent=message;
 if(sources.length){const list=document.createElement('div');list.className='source-list';const title=document.createElement('strong');title.textContent='Evidence consulted';list.append(title);
 for(const s of sources){const a=document.createElement('a');a.textContent=`[${s.id}] ${s.title} ↗`;a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';list.append(a);}div.appendChild(list)}
 log.appendChild(div);log.scrollTop=log.scrollHeight;
}
function status(message){if(note)note.textContent=message}
async function reply(q){if(!q.trim()||submit.disabled)return;
 if(!endpoint){status('The AI service is not deployed yet. This demo does not fabricate answers.');return}
 append(q,'user');submit.disabled=true;input.disabled=true;status('Checking approved evidence…');
 try{
 const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q,history:history.slice(-6)})});
 if(!response.ok)throw new Error(`Service unavailable (${response.status})`);
 const data=await response.json();if(typeof data.answer!=='string')throw Error('Invalid service response');
 append(data.answer,'bot',Array.isArray(data.sources)?data.sources:[]);
 history.push({role:'user',content:q},{role:'assistant',content:data.answer});while(history.length>6)history.shift();
 status(data.grounded?'Answers are generated from approved source excerpts. Verify claims using the linked evidence.':'No approved source matched this question.');
 }catch(err){append('The AI Ambassador is temporarily unavailable. Please use the evidence ledger or contact Michael directly.','bot');status(String(err.message||err))}
 finally{submit.disabled=false;input.disabled=false;input.focus()}
}
form.addEventListener('submit',event=>{event.preventDefault();const q=input.value.trim();input.value='';reply(q)});
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>reply(b.dataset.question)));
if(!endpoint){submit.disabled=true;input.disabled=true;input.placeholder='AI Ambassador awaiting free Worker deployment';status('AI service not deployed. No simulated or keyword-only answers.');}
