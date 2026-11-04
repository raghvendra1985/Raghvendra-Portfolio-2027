import {mkdir,readdir,copyFile,rm,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),dest=resolve(root,'dist');
const excluded=new Set(['dist','node_modules','scripts','.git','.agents','.codex','qa','figma-capture.html','verify.cjs','package.json','package-lock.json']);let count=0;
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
const paidSlugs=new Set(["ai-workflow-starter-kit","design-process-workshop","concept-design-workshop","design-elective-workshop","ux-ui-design-workshop","game-design-workshop","data-visualisation-workshop"]);
async function copy(dir,into,top=false){for(const entry of await readdir(dir,{withFileTypes:true})){if(dir.endsWith("/downloads")&&paidSlugs.has(entry.name.replace(/\.[^.]+$/,"")))continue;if(excluded.has(entry.name)||entry.name.startsWith('.')||entry.name.endsWith('.test.cjs')||(top&&extname(entry.name)==='.md'))continue;const from=resolve(dir,entry.name),to=resolve(into,entry.name);if(entry.isDirectory()){await mkdir(to,{recursive:true});await copy(from,to)}else if(entry.isFile()){await copyFile(from,to);count++}}}
await copy(root,dest,true);for(const name of ['index.html','services/index.html','about/index.html','learning/index.html','resources/index.html','tools/index.html'])await stat(resolve(dest,name));console.log(`Built ${count} public files in ${dest}\nPreview: npm run preview -- --port 4174`);
