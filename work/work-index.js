(()=>{const list=document.querySelector('.wi-grid'),btns=document.querySelectorAll('.wi-toggle [data-view]');if(!list)return;
const set=v=>{list.dataset.view=v;btns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===v)));try{localStorage.setItem('work-view',v)}catch(e){}};
let v='grid';try{const s=localStorage.getItem('work-view');if(s==='list'||s==='grid')v=s}catch(e){}set(v);
btns.forEach(b=>b.addEventListener('click',()=>set(b.dataset.view)));})();
