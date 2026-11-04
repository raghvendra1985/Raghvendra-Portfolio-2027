/* Sticky cards use natural document scrolling; scale follows the approaching card. */
function serviceStackScale(nextTop,top,height){return 1-.045*Math.max(0,Math.min(1,(top+height-nextTop)/Math.max(1,height)))}
if(typeof module!=='undefined')module.exports={serviceStackScale};
if(typeof document!=='undefined')document.querySelectorAll('[data-service-stack]').forEach(stack=>{
 const cards=[...stack.querySelectorAll('.offering')],media=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;
 const reduced=()=>media.matches||!document.documentElement.classList.contains('reference-motion');
 function render(){queued=false;const disabled=reduced()||stack.contains(document.activeElement);stack.classList.toggle('is-enhanced',!disabled);cards.forEach((card,i)=>{const top=Math.min(112+i*24,innerHeight-card.offsetHeight-24);card.style.setProperty('--stack-top',top+'px');card.style.setProperty('--stack-order',String(i+1));const next=cards[i+1];card.style.setProperty('--stack-scale',String(disabled||!next?1:serviceStackScale(next.getBoundingClientRect().top,top,card.offsetHeight)))})}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});media.addEventListener('change',schedule);stack.addEventListener('focusin',schedule);stack.addEventListener('focusout',schedule);new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});new ResizeObserver(schedule).observe(stack);schedule();
});
