if(!self.define){let i,e={};const s=(s,t)=>(s=new URL(s+".js",t).href,e[s]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=s,i.onload=e,document.head.appendChild(i)}else i=s,importScripts(s),e()})).then((()=>{let i=e[s];if(!i)throw new Error(`Module ${s} didn’t register its module`);return i})));self.define=(t,n)=>{const r=i||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const l=i=>s(i,r),u={module:{uri:r},exports:o,require:l};e[r]=Promise.all(t.map((i=>u[i]||l(i)))).then((i=>(n(...i),o)))}}define(["./workbox-6110bacb"],(function(i){"use strict";i.setCacheNameDetails({prefix:"weave-AQhzYhazeKuD2A0s"}),self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"https://erichsia7.github.io/weave/dist/401.5499b72693ef4afffd8f.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/429.395600c2d780a3fd5f0f.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/493.4b28134e691b6ad4b0c0.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/667.ccfbf74b1baa5f95dbf9.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/954.652b54feed928365dff4.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/977.6c63bebdd4b12a45ea04.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/main-31743c5a.35120b3cee5ef6f048f6.min.js",revision:null},{url:"https://erichsia7.github.io/weave/dist/main-cb33e274.0225593a5d7df22072cd.min.css",revision:null},{url:"https://erichsia7.github.io/weave/dist/main-cb33e274.02cd0348f08b0b4f1e6e.min.js",revision:null}],{}),i.registerRoute(/^https:\/\/fonts.googleapis.com/,new i.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
