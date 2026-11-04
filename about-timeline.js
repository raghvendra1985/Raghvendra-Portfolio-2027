function currentTimelineStep(tops,trigger){let selected=-1;tops.forEach((top,i)=>{if(top<=trigger)selected=i});return selected}
if(typeof module!=='undefined')module.exports={currentTimelineStep};
if(typeof document!=='undefined')document.querySelectorAll('.principles-timeline').forEach(list=>{
 const shell=document.createElement('div');shell.className='shared-timeline-shell';list.before(shell);shell.append(list);
 const highlight=document.createElement('div');highlight.className='shared-timeline-highlight';highlight.setAttribute('aria-hidden','true');shell.append(highlight);
 const items=[...list.querySelectorAll(':scope > li')],media=matchMedia('(prefers-reduced-motion: reduce)');let queued=false,last=-2,animation=null;
 function update(){queued=false;const reduced=media.matches||!document.documentElement.classList.contains('reference-motion');const selected=reduced?-1:currentTimelineStep(items.map(n=>n.getBoundingClientRect().top),innerHeight*.6);highlight.hidden=selected<0;items.forEach((n,i)=>{if(i===selected)n.setAttribute('aria-current','step');else n.removeAttribute('aria-current')});if(selected<0){animation?.cancel();animation=null;last=-2;return}const card=items[selected];const x=list.offsetLeft+card.offsetLeft,y=list.offsetTop+card.offsetTop,w=card.offsetWidth,h=card.offsetHeight;
 const changed=selected!==last||highlight.style.width!==w+'px'||highlight.style.height!==h+'px';
 if(changed){const previous=highlight.getBoundingClientRect(),origin=shell.getBoundingClientRect();const from={x:previous.left-origin.left,y:previous.top-origin.top,w:previous.width,h:previous.height};animation?.cancel();highlight.style.width=w+'px';highlight.style.height=h+'px';highlight.style.transform='translate('+x+'px,'+y+'px)';
 if(last!==-2&&highlight.animate){const bow=Math.min(28,innerWidth*.035);const frames=Array.from({length:17},(_,i)=>{const t=i/16;return {offset:t,transform:'translate('+(from.x+(x-from.x)*t+Math.sin(Math.PI*t)*bow)+'px,'+(from.y+(y-from.y)*t)+'px)',width:(from.w+(w-from.w)*t)+'px',height:(from.h+(h-from.h)*t)+'px'}});animation=highlight.animate(frames,{duration:520,easing:'cubic-bezier(.22,1,.36,1)'});}}
 last=selected}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});media.addEventListener('change',schedule);new ResizeObserver(schedule).observe(list);new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});schedule();
});
