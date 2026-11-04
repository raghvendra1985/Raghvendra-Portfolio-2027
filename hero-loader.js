/* Branded introduction; no simulated percentage or network progress. */
(()=>{
 const root=document.documentElement,hero=document.querySelector('.hero');
 if(!hero||matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash||scrollY>0)return;
 try{if(sessionStorage.getItem('et-hero-intro'))return;sessionStorage.setItem('et-hero-intro','seen')}catch{}
 const loader=document.createElement('div');loader.className='hero-loader';loader.setAttribute('aria-label','Opening Elevate Thrive');
 loader.innerHTML='<div class="loader-brand"><img src="/assets/logo-header-white.svg" width="400" height="85" alt="ElevateThrive Consulting"><p>Learn. Build. Thrive.</p><span class="loader-track" aria-hidden="true"></span></div><button type="button">Skip introduction ↗</button>';
 document.body.append(loader);root.classList.add('hero-loading');
 const regions=[...document.querySelectorAll('header,main,footer')].filter(e=>!e.inert);regions.forEach(e=>e.inert=true);
 let done=false;const started=performance.now();const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 function finish(immediate=false){if(done)return;done=true;clearTimeout(failsafe);root.classList.remove('hero-loading');regions.forEach(e=>e.inert=false);document.body.style.overflow=oldOverflow;loader.classList.add('loader-exit');if(!immediate)hero.classList.add('hero-enter');setTimeout(()=>{loader.remove();hero.classList.remove('hero-enter')},immediate?0:650)}
 const failsafe=setTimeout(()=>finish(),1600);
 loader.querySelector('button').addEventListener('click',()=>{finish(true);document.querySelector('.skip')?.focus()});
 const preference=matchMedia('(prefers-reduced-motion: reduce)');preference.addEventListener('change',e=>{if(e.matches)finish(true)},{once:true});
 const logo=loader.querySelector('img');const ready=logo.complete?Promise.resolve():new Promise(resolve=>{logo.onload=resolve;logo.onerror=resolve});
 Promise.race([Promise.all([ready,document.fonts?.ready||Promise.resolve()]),new Promise(resolve=>setTimeout(resolve,1000))]).then(()=>setTimeout(()=>finish(),Math.max(0,650-(performance.now()-started))));
})();
