/* Native radios retain keyboard support; selects remain the no-JS fallback. */
document.querySelectorAll('#project-brief select[name=interest],.demo-form select[name=interest]').forEach((select,index)=>{
 const label=select.closest('label')||select.labels?.[0]; if(!label)return; const fallback=select.closest('.form-field')||label;
 const group=document.createElement('fieldset');group.className='choice-group';
 const legend=document.createElement('legend');legend.textContent=select.closest('.demo-form')?'Choose your interest':'How can I help?';group.append(legend);
 const options=document.createElement('div');options.className='choice-options';
 [...select.options].forEach(option=>{const wrap=document.createElement('label'),radio=document.createElement('input'),text=document.createElement('span');radio.type='radio';radio.name='interest-choice-'+index;radio.value=option.value;radio.checked=option.selected;text.textContent=option.textContent;radio.addEventListener('change',()=>{if(radio.checked)select.value=radio.value});wrap.append(radio,text);options.append(wrap)});
 group.append(options);fallback.before(group);fallback.hidden=true;
});
