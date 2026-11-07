import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {validateInputs} from './engine.js';
import {requestBody,parseResponse,apiError} from './ai.mjs';
const root=new URL('./',import.meta.url),port=Number(process.env.PORT||8766);let busy=false,calls=0;
const allowed=o=>!o||o===`http://127.0.0.1:${port}`||o===`http://localhost:${port}`||(/^chrome-extension:\/\/[a-p]{32}$/.test(o)&&(!process.env.EXTENSION_ID||o===`chrome-extension://${process.env.EXTENSION_ID}`));
const files={'/':'popup.html','/popup.html':'popup.html','/popup.js':'popup.js','/engine.js':'engine.js','/style.css':'style.css'};
http.createServer(async(req,res)=>{
 const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; connect-src 'self' http://127.0.0.1:8766; style-src 'self'; script-src 'self'; frame-ancestors 'none'"};
 const origin=req.headers.origin;if(!allowed(origin)){res.writeHead(403);return res.end();}if(origin){headers['Access-Control-Allow-Origin']=origin;headers.Vary='Origin';}
 headers['Access-Control-Allow-Headers']='Content-Type';headers['Access-Control-Allow-Methods']='GET,POST,OPTIONS';
 const send=(status,data)=>{res.writeHead(status,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify(data));};
 if(!['127.0.0.1','localhost'].includes((req.headers.host||'').split(':')[0]))return send(403,{error:'Local host required.'});
 if(req.method==='OPTIONS'){res.writeHead(204,headers);return res.end();}
 const path=new URL(req.url,'http://localhost').pathname;
 if(req.method==='GET'&&path==='/api/status')return send(200,{configured:!!process.env.OPENAI_API_KEY,model:process.env.OPENAI_MODEL||'gpt-4.1-mini'});
 if(req.method==='GET'&&files[path]){const file=files[path];res.writeHead(200,{...headers,'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});return res.end(await readFile(new URL(file,root)));}
 if(req.method!=='POST'||!['/api/suggest','/api/extract'].includes(path))return send(404,{error:'Not found'});
 if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'JSON required.'});
 try{
  let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>8000000)return send(413,{error:'File/request too large. Use a file under 5 MB.'});}
  const body=JSON.parse(raw);
  if(path==='/api/extract'){
   if(typeof body.data!=='string'||typeof body.name!=='string')return send(400,{error:'Choose a PDF, DOCX, or TXT file.'});
   const buffer=Buffer.from(body.data,'base64');if(buffer.length>5000000)return send(413,{error:'File must be under 5 MB.'});
   let text='';
   if(/\.pdf$/i.test(body.name)){const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');const task=getDocument({data:new Uint8Array(buffer),isEvalSupported:false,useSystemFonts:true});const doc=await task.promise;try{if(doc.numPages>25)throw new Error('Use a PDF with at most 25 pages.');for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i);const content=await page.getTextContent();text+=content.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join('')+'\n';}}finally{await task.destroy();}}
   else if(/\.docx$/i.test(body.name)){const mammoth=await import('mammoth');text=(await mammoth.default.extractRawText({buffer})).value;}
   else if(/\.txt$/i.test(body.name))text=buffer.toString('utf8');else return send(400,{error:'Use PDF, DOCX, or TXT. Old .doc files are not supported.'});
   if(text.trim().length<40)return send(400,{error:'No readable text found. Scanned PDFs need OCR; paste your résumé text instead.'});
   if(text.length>40000)return send(400,{error:'The extracted résumé exceeds 40,000 characters. Paste a shorter version.'});
   return send(200,{text});
  }
  validateInputs(body);if(body.consent!==true)return send(400,{error:'Confirm consent before sending text to OpenAI.'});
  if(!process.env.OPENAI_API_KEY)return send(503,{error:'No API key configured on the local server. Local comparison still works.'});
  if(busy)return send(429,{error:'A suggestion request is already running.'});if(calls>=20)return send(429,{error:'This local session has reached its 20-request limit. Restart deliberately to reset.'});
  busy=true;calls++;
  try{const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(requestBody(body.resume,body.job,process.env.OPENAI_MODEL)),signal:AbortSignal.timeout(60000)});const data=await response.json();if(!response.ok)return send(response.status,{error:apiError(response.status,data.error?.code)});return send(200,{...parseResponse(data,body.resume),source:'openai'});}finally{busy=false;}
 }catch(error){send(400,{error:error.name==='TimeoutError'?'Request timed out. Try shorter text.':error instanceof SyntaxError?'Invalid input or response JSON.':error.message?.includes('40 characters')||error.message?.includes('characters.')||error.message?.includes('25 pages')?error.message:'Unable to process this request. Check the file or try pasting text.'});}
}).listen(port,'127.0.0.1',()=>console.log(`Resume Analyzer: http://127.0.0.1:${port} (local only)`));
