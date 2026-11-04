const {test}=require('node:test'),assert=require('node:assert/strict');const {featureScrollState:state}=require('./feature-scroll.js');
test('scroll selects steps in sequence and reverses deterministically',()=>{assert.deepEqual([0,.4,.8,.4,0].map(p=>state(p).index),[0,1,2,1,0])});
test('clamps start and end without producing a fourth step',()=>{assert.deepEqual(state(-1),{index:0,fraction:0});assert.deepEqual(state(2),{index:2,fraction:1})});
test('step progress tracks local scroll position',()=>{assert.equal(state(.5).index,1);assert.equal(state(.5).fraction,.5)});
