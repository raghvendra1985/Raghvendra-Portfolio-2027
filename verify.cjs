const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(__dirname+'/motion.js','utf8');
function harness(prefersReduced=false){
 const handlers={}; const classes=new Set();
 function el(){return {style:{},children:[],dataset:{},classList:{toggle:(c,on)=>on?classes.add(c):classes.delete(c),contains:c=>classes.has(c),remove:c=>classes.delete(c)},append(x){this.children.push(x)},attributes:{},setAttribute(k,v){this.attributes[k]=v},getAttribute(k){return this.attributes[k]},addEventListener(k,f){this[k]=f},getBoundingClientRect(){return {top:80-y}},offsetHeight:650};}
 let y=0; const nodes={}; for(const key of ['#panels','.hero','.stage','.hero-rest','.floor','.glow','.scroll-hint','#motion-toggle','.menu','#navigation'])nodes[key]=el();
 nodes['.hero'].offsetHeight=2220;
 const media={matches:prefersReduced,addEventListener(k,f){this[k]=f}};
 const context={document:{querySelector:k=>nodes[k],querySelectorAll:()=>[],createElement:el,documentElement:el(),addEventListener(k,f){handlers[k]=f}},innerWidth:1280,matchMedia:()=>media,getComputedStyle:()=>({getPropertyValue:()=>80}),requestAnimationFrame:f=>f(),addEventListener:(k,f)=>handlers[k]=f};
 vm.runInNewContext(source,context);
 return {nodes,media,classes,scroll(n){y=n;handlers.scroll()},toggle(){nodes['#motion-toggle'].click()}};
}
test('OS reduced motion immediately exposes content and removes pinning',()=>{const h=harness(true);assert.equal(h.classes.has('motion-on'),false);assert.notEqual(h.nodes['.hero-rest'].inert,true);assert.notEqual(h.nodes['.hero-rest'].style.opacity,0);assert.equal(h.nodes['#motion-toggle'].disabled,true)});
test('scrolling to the same position exactly restores transforms and opacity',()=>{const h=harness();h.scroll(500);const a=JSON.stringify(h.nodes['#panels'].children.map(x=>x.style));h.scroll(1100);h.scroll(500);assert.equal(JSON.stringify(h.nodes['#panels'].children.map(x=>x.style)),a)});
test('hero actions remain available throughout the scroll animation',()=>{const h=harness();for(const y of [0,700,1550]){h.scroll(y);const rest=h.nodes['.hero-rest'];assert.notEqual(rest.inert,true);assert.notEqual(rest.style.visibility,'hidden');assert.notEqual(rest.style.opacity,0);}});
test('preference changes update the page without reload',()=>{const h=harness();h.media.matches=true;h.media.change();assert.equal(h.classes.has('motion-on'),false);assert.notEqual(h.nodes['.hero-rest'].inert,true);h.media.matches=false;h.media.change();assert.equal(h.classes.has('motion-on'),true)});
test('manual motion reduction removes the animated scroll distance',()=>{const h=harness();h.toggle();assert.equal(h.classes.has('motion-on'),false);assert.equal(h.nodes['#motion-toggle'].attributes['aria-pressed'],'true');h.toggle();assert.equal(h.classes.has('motion-on'),true)});
