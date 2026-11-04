import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,relative,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const args=process.argv.slice(2),flag=args.indexOf('--port'),port=Number(flag>=0?args[flag+1]:process.env.PORT||4173);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Choose a port between 1 and 65535.');
const project=fileURLToPath(new URL('../',import.meta.url)),root=args.includes('--dist')?resolve(project,'dist'):project;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.pdf':'application/pdf','.md':'text/markdown; charset=utf-8','.ttf':'font/ttf','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});return res.end()}
 try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname),segments=path.split('/');if(segments.some(s=>s.startsWith('.')||s==='node_modules'||s==='scripts'))throw new Error('Not public');let file=resolve(root,'.'+path);if(relative(root,file).startsWith('..'+sep)||relative(root,file)==='..')throw new Error('Outside root');const info=await stat(file);if(info.isDirectory())file=resolve(file,'index.html');const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data)}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Page not found')}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is already in use. Open http://127.0.0.1:${port}/ or choose: npm run dev -- --port 4174`:error.message);process.exitCode=1});
server.listen(port,'127.0.0.1',()=>console.log(`Elevate Thrive ${args.includes('--dist')?'build preview':'local development'}: http://127.0.0.1:${port}/\nServing ${root}\nPress Ctrl+C to stop.`));
