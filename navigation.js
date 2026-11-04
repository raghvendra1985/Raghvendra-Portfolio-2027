/* Upper-right expanding panel, inspired by the selected Animmaster preview. */
(()=>{
 const toggle=document.querySelector('.menu'),nav=document.querySelector('#navigation');if(!toggle||!nav)return;
 const panel=document.createElement('dialog');panel.className='side-panel';panel.id='navigation-panel';panel.setAttribute('aria-label','Site navigation');
 const close=document.createElement('button');close.type='button';close.className='panel-close';close.textContent='Close ×';close.setAttribute('aria-label','Close navigation');
 const logo=document.createElement('a');logo.href='/';logo.className='panel-brand';logo.setAttribute('aria-label','Elevate Thrive home');const img=document.createElement('img');img.src='/assets/logo-header-white.svg';img.alt='ElevateThrive Consulting';img.width=240;img.height=51;logo.append(img);
 const foot=document.createElement('div');foot.className='panel-footer';const contact=document.createElement('a');contact.href='mailto:hello@raghvendrasingh.com';contact.textContent='Start a conversation ↗';const note=document.createElement('p');note.textContent='Learn. Build. Thrive.';foot.append(contact,note);
 panel.append(close,logo,nav,foot);document.body.append(panel);document.documentElement.classList.add('panel-navigation');toggle.setAttribute('aria-controls',panel.id);
 nav.querySelectorAll('a').forEach((a,i)=>{a.style.setProperty('--link-order',String(i));const path=location.pathname;if(a.getAttribute('href')===path||(a.getAttribute('href')!=='/'&&path.startsWith(a.getAttribute('href'))))a.setAttribute('aria-current','page')});
 const inline=nav.cloneNode(true);
 inline.removeAttribute('id');
 inline.className='inline-navigation';
 const learn=document.createElement('details');
 const summary=document.createElement('summary');
 summary.textContent='Learn';
 const links=document.createElement('div');
 links.className='learn-links';
 ['/learning/','/resources/','/tools/'].forEach(path=>links.append(inline.querySelector(`a[href="${path}"]`)));
 learn.append(summary,links);
 inline.insertBefore(learn,inline.querySelector('a[href="/newsletter/"]'));
 (toggle.parentElement.querySelector(':scope > .button') || toggle).before(inline);
 document.addEventListener('click',event=>{if(learn.open&&!learn.contains(event.target))learn.open=false});
 learn.addEventListener('keydown',event=>{if(event.key==='Escape'&&learn.open){learn.open=false;summary.focus()}});
 const wide=matchMedia('(min-width:850px)');
 wide.addEventListener('change',()=>{learn.open=false;if(wide.matches)shut()});
 let previousOverflow='';
 function finish(){panel.classList.remove('panel-open');nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=previousOverflow;toggle.focus()}
 function shut(){if(panel.open)panel.close()}
 toggle.addEventListener('click',()=>{if(panel.open){shut();return}previousOverflow=document.body.style.overflow;panel.showModal();panel.classList.add('panel-open');document.body.style.overflow='hidden';toggle.setAttribute('aria-expanded','true');close.focus()});
 close.addEventListener('click',shut);panel.addEventListener('close',finish);panel.addEventListener('cancel',event=>{event.preventDefault();shut()});
 panel.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const controls=[...panel.querySelectorAll('button:not([disabled]), a[href]')].filter(control=>control.getClientRects().length);
  const edge=event.shiftKey?controls[0]:controls.at(-1);
  if(document.activeElement===edge){event.preventDefault();(event.shiftKey?controls.at(-1):controls[0]).focus()}
 });
 panel.addEventListener('click',e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)shut()}});nav.addEventListener('click',e=>{if(e.target.closest('a'))shut()});
})();
