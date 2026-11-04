/* Soft community prompt for Studio tools. Tools stay fully free.
   Replace the invite: edit WHATSAPP_INVITE below (or set data-whatsapp-invite on <body>). */
(function(){
  var WHATSAPP_INVITE='https://chat.whatsapp.com/JbfvyF7ZUiB8iLJN8RcoJL';
  var USED='et-tools-used',DISMISSED='et-community-prompt-dismissed',JOINED='et-community-joined';
  var SNOOZE_DAYS=7;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var path=location.pathname.replace(/\/+$/,'/');
  var isToolPage=/^\/tools\/[^/]+\/$/.test(path);
  // Index: mark intent when a tool is clicked
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="/tools/"]');if(a&&/^\/tools\/[^/]+\/?$/.test(a.getAttribute('href')))set(USED,String(Date.now()))});
  if(!isToolPage)return;
  if(!get(USED))set(USED,String(Date.now()));
  if(get(JOINED))return;
  var d=Number(get(DISMISSED)||0);if(d&&Date.now()-d<SNOOZE_DAYS*864e5)return;
  var shown=false;
  function show(){if(shown)return;shown=true;
    var invite=document.body.getAttribute('data-whatsapp-invite')||WHATSAPP_INVITE;
    var prev=document.activeElement;
    var wrap=document.createElement('div');wrap.className='cp-backdrop';
    wrap.innerHTML='<div class="cp-dialog" role="dialog" aria-modal="true" aria-labelledby="cp-title" aria-describedby="cp-desc">'+
      '<p class="cp-eyebrow">Elevate Thrive Students</p><h2 id="cp-title">Keep practising with other design students</h2>'+
      '<div id="cp-desc"><p>This tool stays free — always. Join <strong>Elevate Thrive Students</strong> on WhatsApp to get:</p><ul><li>New prompts and tool updates</li><li>Free worksheets as they’re released</li><li>Early notice of workshops and paid worksheet packs</li></ul></div>'+
      '<div class="cp-actions"><a class="cp-join" data-whatsapp-invite href="'+invite+'" target="_blank" rel="noopener noreferrer">Join Elevate Thrive Students<span class="visually-hidden"> (opens in a new tab)</span></a><button type="button" class="cp-later">Maybe later</button></div>'+
      '<p class="cp-note">You can keep using the tool either way. Leave the group anytime.</p></div>';
    document.body.appendChild(wrap);
    var dlg=wrap.firstChild,join=dlg.querySelector('.cp-join'),later=dlg.querySelector('.cp-later');
    var sr=join.querySelector('.visually-hidden');sr.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
    function close(){set(DISMISSED,String(Date.now()));document.removeEventListener('keydown',key);wrap.remove();if(prev&&prev.focus)prev.focus()}
    function key(e){if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'){var f=[join,later];var i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();later.focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();join.focus()}}}
    document.addEventListener('keydown',key);
    later.addEventListener('click',close);
    wrap.addEventListener('click',function(e){if(e.target===wrap)close()});
    join.addEventListener('click',function(){set(JOINED,String(Date.now()));setTimeout(function(){wrap.remove()},0)});
    join.focus();
  }
  // Show after first real interaction with the tool, or after 25s on page.
  var main=document.getElementById('main-content')||document.body;
  function onUse(e){if(e.target.closest&&e.target.closest('header,footer,nav'))return;main.removeEventListener('click',onUse,true);main.removeEventListener('input',onUse,true);setTimeout(show,1500)}
  main.addEventListener('click',onUse,true);main.addEventListener('input',onUse,true);
  setTimeout(show,25000);
  if(/[?&]community-prompt=1/.test(location.search))show();
})();
