function enquiryStarterValue(current,previous,suggestion){return !current.trim()||current===previous?suggestion:current}
if(typeof module!=='undefined')module.exports={enquiryStarterValue};
if(typeof document!=='undefined'){
 const form=document.querySelector('#project-brief');
 if(form){form.querySelector('.enquiry-starters').hidden=false;let previous='';const challenge=form.querySelector('[name=challenge]'),interest=form.querySelector('[name=interest]'),buttons=[...form.querySelectorAll('[data-enquiry-starter]')],status=form.querySelector('.starter-status');
 buttons.forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.enquiryInterest,suggestion=button.dataset.enquiryStarter;const next=enquiryStarterValue(challenge.value,previous,suggestion);const preserved=next===challenge.value&&challenge.value!==previous&&Boolean(challenge.value.trim());challenge.value=next;if(!preserved)previous=suggestion;interest.value=value;interest.dispatchEvent(new Event('change',{bubbles:true}));form.querySelectorAll('input[type=radio][name^="interest-choice-"]').forEach(radio=>radio.checked=radio.value===value);buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));status.textContent=preserved?'Selected '+value+'. Your existing challenge is unchanged.':'Selected '+value+'. Edit the starter below to describe your situation.';}));
 }
}
