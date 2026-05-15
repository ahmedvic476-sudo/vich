const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8000;
const ROOT = __dirname;
const MIME = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p==='/'||p==='') p='/index.html';
  let file = path.join(ROOT,p);
  if(!file.startsWith(ROOT)){res.writeHead(403);res.end('Forbidden');return;}
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('File not found: '+p);return;}
    res.writeHead(200,{'Content-Type':MIME[path.extname(file).toLowerCase()]||'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT,()=>{
  console.log('PlayStation Cafe Manager V5.2 Stable');
  console.log('Open: http://localhost:'+PORT+'/index.html');
});
