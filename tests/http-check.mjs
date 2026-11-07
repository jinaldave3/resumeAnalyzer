import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const base='http://127.0.0.1:8766';
for(const name of ['resume.txt','resume.pdf','resume.docx']){const data=(await readFile(new URL('fixtures/'+name,import.meta.url))).toString('base64');const response=await fetch(base+'/api/extract',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,data})});const body=await response.json();assert.equal(response.status,200,JSON.stringify(body));assert.match(body.text,/Python SQL React/);console.log(name+' extraction passed');}
assert.equal((await fetch(base+'/.env.local')).status,404);console.log('Secret file not served');
assert.equal((await fetch(base+'/api/status',{headers:{Origin:'https://untrusted.example'}})).status,403);console.log('Untrusted website origin rejected');
const denied=await fetch(base+'/api/suggest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({resume:'x'.repeat(100),job:'y'.repeat(100),consent:false})});assert.equal(denied.status,400);console.log('Consent required before API request');
