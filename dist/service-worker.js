if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const c=e=>s(e,o),l={module:{uri:o},exports:r,require:c};i[o]=Promise.all(t.map((e=>l[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-6110bacb"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pwdgen2-otiWbzBO2kpXO06Z"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://erichsia7.github.io/pwdgen2/dist/main-cb33e274.77aebef22e2b1682c24f.min.js",revision:null},{url:"https://erichsia7.github.io/pwdgen2/dist/main-cb33e274.7bdf0aad84b4da59d902.min.css",revision:null},{url:"https://erichsia7.github.io/pwdgen2/dist/main-d2eb5610.c645ba421d70bf639ccf.min.js",revision:null},{url:"https://erichsia7.github.io/pwdgen2/dist/main-e96e9bea.c565de0bb65aff2636b3.min.js",revision:null}],{}),e.registerRoute(/^https:\/\/fonts.googleapis.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
