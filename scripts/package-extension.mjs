import {mkdir,copyFile} from 'node:fs/promises';
await mkdir(new URL('../dist-extension/icons/',import.meta.url),{recursive:true});
for(const name of ['manifest.json','popup.html','popup.js','engine.js','style.css','icons/icon.png'])await copyFile(new URL('../'+name,import.meta.url),new URL('../dist-extension/'+name,import.meta.url));
console.log('Extension created in dist-extension; no backend, API key or env file included.');
