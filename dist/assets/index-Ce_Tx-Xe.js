import{initializeApp as V}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";import{getFirestore as z,deleteDoc as W,doc as k,getDoc as X,Timestamp as v,addDoc as b,collection as x,query as Q,where as F,getDocs as Z}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(L||(L={}));var B;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(B||(B={}));var D;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(D||(D={}));var P;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(P||(P={}));var R;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.OTHER="OTHER"})(R||(R={}));var G;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(G||(G={}));/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class H extends C{constructor(t,n){super(t),this.response=n}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="https://generativelanguage.googleapis.com",te="v1",ne="0.2.1",se="genai-js";var h;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(h||(h={}));class A{constructor(t,n,o,s){this.model=t,this.task=n,this.apiKey=o,this.stream=s}toString(){let t=`${ee}/${te}/${this.model}:${this.task}`;return this.stream&&(t+="?alt=sse"),t}}function oe(){return`${se}/${ne}`}async function O(e,t,n){let o;try{if(o=await fetch(e.toString(),Object.assign(Object.assign({},re(n)),{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-client":oe(),"x-goog-api-key":e.apiKey},body:t})),!o.ok){let s="";try{const r=await o.json();s=r.error.message,r.error.details&&(s+=` ${JSON.stringify(r.error.details)}`)}catch{}throw new Error(`[${o.status} ${o.statusText}] ${s}`)}}catch(s){const r=new C(`Error fetching from ${e.toString()}: ${s.message}`);throw r.stack=s.stack,r}return o}function re(e){const t={};if((e==null?void 0:e.timeout)>=0){const n=new AbortController,o=n.signal;setTimeout(()=>n.abort(),e.timeout),t.signal=o}return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),U(e.candidates[0]))throw new H(`${T(e)}`,e);return ae(e)}else if(e.promptFeedback)throw new H(`Text not available. ${T(e)}`,e);return""},e}function ae(e){var t,n,o,s;return!((s=(o=(n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o[0])===null||s===void 0)&&s.text?e.candidates[0].content.parts[0].text:""}const ie=[R.RECITATION,R.SAFETY];function U(e){return!!e.finishReason&&ie.includes(e.finishReason)}function T(e){var t,n,o;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const r=e.candidates[0];U(r)&&(s+=`Candidate was blocked due to ${r.finishReason}`,r.finishMessage&&(s+=`: ${r.finishMessage}`))}return s}function S(e){return this instanceof S?(this.v=e,this):new S(e)}function ce(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),s,r=[];return s={},c("next"),c("throw"),c("return"),s[Symbol.asyncIterator]=function(){return this},s;function c(d){o[d]&&(s[d]=function(m){return new Promise(function(E,p){r.push([d,m,E,p])>1||i(d,m)})})}function i(d,m){try{l(o[d](m))}catch(E){y(r[0][3],E)}}function l(d){d.value instanceof S?Promise.resolve(d.value.v).then(u,f):y(r[0][2],d)}function u(d){i("next",d)}function f(d){i("throw",d)}function y(d,m){d(m),r.shift(),r.length&&i(r[0][0],r[0][1])}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function le(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=me(t),[o,s]=n.tee();return{stream:ue(o),response:de(s)}}async function de(e){const t=[],n=e.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return M(Ee(t));t.push(s)}}function ue(e){return ce(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:s}=yield S(n.read());if(s)break;yield yield S(M(o))}})}function me(e){const t=e.getReader();return new ReadableStream({start(o){let s="";return r();function r(){return t.read().then(({value:c,done:i})=>{if(i){if(s.trim()){o.error(new C("Failed to parse stream"));return}o.close();return}s+=c;let l=s.match($),u;for(;l;){try{u=JSON.parse(l[1])}catch{o.error(new C(`Error parsing JSON response: "${l[1]}"`));return}o.enqueue(u),s=s.substring(l[0].length),l=s.match($)}return r()})}}})}function Ee(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const o of e)if(o.candidates)for(const s of o.candidates){const r=s.index;if(n.candidates||(n.candidates=[]),n.candidates[r]||(n.candidates[r]={index:s.index}),n.candidates[r].citationMetadata=s.citationMetadata,n.candidates[r].finishReason=s.finishReason,n.candidates[r].finishMessage=s.finishMessage,n.candidates[r].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[r].content||(n.candidates[r].content={role:s.content.role||"user",parts:[{text:""}]});for(const c of s.content.parts)c.text&&(n.candidates[r].content.parts[0].text+=c.text)}}return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j(e,t,n,o){const s=new A(t,h.STREAM_GENERATE_CONTENT,e,!0),r=await O(s,JSON.stringify(n),o);return le(r)}async function q(e,t,n,o){const s=new A(t,h.GENERATE_CONTENT,e,!1),c=await(await O(s,JSON.stringify(n),o)).json();return{response:M(c)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e,t){let n=[];if(typeof e=="string")n=[{text:e}];else for(const o of e)typeof o=="string"?n.push({text:o}):n.push(o);return{role:t,parts:n}}function N(e){return e.contents?e:{contents:[_(e,"user")]}}function fe(e){return typeof e=="string"||Array.isArray(e)?{content:_(e,"user")}:e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K="SILENT_ERROR";class he{constructor(t,n,o,s){this.model=n,this.params=o,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o!=null&&o.history&&(this._history=o.history.map(r=>{if(!r.role)throw new Error("Missing role for history item: "+JSON.stringify(r));return _(r.parts,r.role)}))}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t){var n,o;await this._sendPromise;const s=_(t,"user"),r={safetySettings:(n=this.params)===null||n===void 0?void 0:n.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,contents:[...this._history,s]};let c;return this._sendPromise=this._sendPromise.then(()=>q(this._apiKey,this.model,r,this.requestOptions)).then(i=>{var l;if(i.response.candidates&&i.response.candidates.length>0){this._history.push(s);const u=Object.assign({parts:[],role:"model"},(l=i.response.candidates)===null||l===void 0?void 0:l[0].content);this._history.push(u)}else{const u=T(i.response);u&&console.warn(`sendMessage() was unsuccessful. ${u}. Inspect response object for details.`)}c=i}),await this._sendPromise,c}async sendMessageStream(t){var n,o;await this._sendPromise;const s=_(t,"user"),r={safetySettings:(n=this.params)===null||n===void 0?void 0:n.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,contents:[...this._history,s]},c=j(this._apiKey,this.model,r,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>c).catch(i=>{throw new Error(K)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history.push(s);const l=Object.assign({},i.candidates[0].content);l.role||(l.role="model"),this._history.push(l)}else{const l=T(i);l&&console.warn(`sendMessageStream() was unsuccessful. ${l}. Inspect response object for details.`)}}).catch(i=>{i.message!==K&&console.error(i)}),c}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pe(e,t,n,o){const s=new A(t,h.COUNT_TOKENS,e,!1);return(await O(s,JSON.stringify(Object.assign(Object.assign({},n),{model:t})),o)).json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ge(e,t,n,o){const s=new A(t,h.EMBED_CONTENT,e,!1);return(await O(s,JSON.stringify(n),o)).json()}async function ye(e,t,n,o){const s=new A(t,h.BATCH_EMBED_CONTENTS,e,!1),r=n.requests.map(i=>Object.assign(Object.assign({},i),{model:t}));return(await O(s,JSON.stringify({requests:r}),o)).json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(t,n,o){this.apiKey=t,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.requestOptions=o||{}}async generateContent(t){const n=N(t);return q(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},n),this.requestOptions)}async generateContentStream(t){const n=N(t);return j(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},n),this.requestOptions)}startChat(t){return new he(this.apiKey,this.model,t,this.requestOptions)}async countTokens(t){const n=N(t);return pe(this.apiKey,this.model,n)}async embedContent(t){const n=fe(t);return ge(this.apiKey,this.model,n)}async batchEmbedContents(t){return ye(this.apiKey,this.model,t,this.requestOptions)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new C("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Ie(this.apiKey,t,n)}}let Y,J,w;const Ce={apiKey:"AIzaSyBiky1i346MS8w-S9fwyxvQ4zVy_Y3pSnY",authDomain:"playground-f462b.firebaseapp.com",projectId:"playground-f462b",storageBucket:"playground-f462b.firebasestorage.app",messagingSenderId:"1034492625686",appId:"1:1034492625686:web:30462a74efd373f3934637"},Se=V(Ce),I=z(Se);async function Ae(){try{const e=k(I,"apikey","googlegenai"),t=await X(e);if(!t.exists()){console.error("API key document not found in Firestore");return}if(w=t.data().key,!w){console.error("API key is empty in Firestore document");return}Y=new _e(w),J=Y.getGenerativeModel({model:"gemini-pro"}),console.log("Chatbot initialized successfully")}catch(e){console.error("Error initializing chatbot:",e)}}async function Oe(e){try{return(await(await J.generateContent(e)).response).text()}catch(t){return console.error("Error asking chatbot:",t),"Sorry, I encountered an error. Please try again."}}const g={toggleIncomeForm:e=>{const t=document.getElementById("incomeForm");t&&t.classList.toggle("hidden",!e)},toggleExpenseForm:e=>{const t=document.getElementById("expenseForm");t&&t.classList.toggle("hidden",!e)}};let a={fIncomeSource:null,fIncomeAmt:null,hIncomeForm:null,fExpenseTxt:null,fExpenseAmt:null,fExpenseCategory:null,hExpenseForm:null,selectedMonth:null,balanceElement:null,listIncomeElement:null,listExpenseElement:null,chatHistory:null,chatInput:null,sendButton:null,init:()=>{if(a.fIncomeSource=document.getElementById("incomeFormSource"),a.fIncomeAmt=document.getElementById("incomeFormAmt"),a.hIncomeForm=document.getElementById("incomeForm"),a.fExpenseTxt=document.getElementById("expenseFormTxt"),a.fExpenseAmt=document.getElementById("expenseFormAmt"),a.fExpenseCategory=document.getElementById("expenseFormCategory"),a.hExpenseForm=document.getElementById("expenseForm"),a.balanceElement=document.getElementById("balanceAm"),a.incomeElement=document.getElementById("incomeAm"),a.expenseElement=document.getElementById("expenseAm"),a.listIncomeElement=document.getElementById("listIncome"),a.listExpenseElement=document.getElementById("listExpense"),!a.balanceElement||!a.listIncomeElement||!a.listExpenseElement){console.error("Balance or list element not found!");return}const e=document.getElementById("monthSelect"),t=new Date,n=t.getFullYear();["January","February","March","April","May","June","July","August","September","October","November","December"].forEach((i,l)=>{const u=document.createElement("option");u.value=`${n}-${l+1}`,u.textContent=`${i} ${n}`,e.appendChild(u)});const s=t.getMonth();e.value=`${n}-${s+1}`,e.addEventListener("change",i=>{a.selectedMonth=i.target.value,console.log("Selected month",a.selectedMonth),a.fetchEntries(),console.log("Selected Month:",a.selectedMonth)}),a.chatHistory=document.getElementById("chat-history"),a.chatInput=document.getElementById("chat-input"),a.sendButton=document.getElementById("send-btn");const r=document.getElementById("minimize-chat"),c=document.getElementById("chatbot-container");r&&c&&r.addEventListener("click",()=>{c.classList.toggle("minimized")}),Ae().then(()=>{console.log("Chatbot ready")}).catch(i=>{console.error("Failed to initialize chatbot:",i)}),a.sendButton&&a.sendButton.addEventListener("click",()=>a.handleChatMessage()),a.chatInput&&a.chatInput.addEventListener("keypress",i=>{i.key==="Enter"&&a.handleChatMessage()})},fetchEntries:async()=>{if(!a.selectedMonth)return;const[e,t]=a.selectedMonth.split("-"),n=parseInt(t)-1,o=new Date(e,n,1),s=new Date(e,n+1,1),r=v.fromDate(o),c=v.fromDate(s);try{const i=Q(x(I,"entradas"),F("date",">=",r),F("date","<",c)),l=await Z(i);let u=0,f=0;a.listIncomeElement.innerHTML="",a.listExpenseElement.innerHTML="",l.forEach(d=>{const m=d.data(),E=document.createElement("button");E.textContent="X",E.style.fontSize="12px",E.style.color="white",E.style.backgroundColor="red",E.style.border="none",E.style.padding="5px",E.style.marginLeft="5px",E.style.cursor="pointer";const p=document.createElement("div");p.textContent=`${m.source||m.t} ${m.s==="+"?"(Income)":"(Expense)"}: $${m.a}`,E.addEventListener("click",async()=>{await a.deleteEntry(d.id),a.fetchEntries()}),p.appendChild(E),m.s==="+"?(a.listIncomeElement.appendChild(p),u+=m.a):m.s==="-"&&(a.listExpenseElement.appendChild(p),f+=m.a)});const y=u-f;a.incomeElement.textContent=`$${u.toFixed(2)}`,a.expenseElement.textContent=`$${f.toFixed(2)}`,a.balanceElement.textContent=`$${y.toFixed(2)}`,console.log("Total Income:",u),console.log("Total Expense:",f),console.log("Balance:",y)}catch(i){console.error("Error fetching entries: ",i)}},deleteEntry:async function(e){try{await W(k(I,"entradas",e)),console.log("Entry deleted:",e)}catch(t){console.error("Error deleting entry: ",t)}},saveIncome:async()=>{if(!a.selectedMonth){console.error("No month selected.");return}const e=a.selectedMonth.split("-"),t=e[0],n=parseInt(e[1])-1,o=new Date(t,n,1);let s={s:"+",t:"",a:parseFloat(a.fIncomeAmt.value),c:"",source:a.fIncomeSource.value,date:v.fromDate(o)};try{const r=await b(x(I,"entradas"),s);console.log("Income document written with ID: ",r.id),a.clearForm(),g.toggleIncomeForm(!1),a.fetchEntries()}catch(r){console.error("Error adding document: ",r)}},saveExpense:async()=>{if(!a.selectedMonth){console.error("No month selected.");return}const e=a.selectedMonth.split("-"),t=e[0],n=parseInt(e[1])-1,o=new Date(t,n,1);let s={s:"-",t:a.fExpenseTxt.value,a:parseFloat(a.fExpenseAmt.value),c:a.fExpenseCategory.value,source:"",date:v.fromDate(o)};try{const r=await b(x(I,"entradas"),s);console.log("Expense document written with ID: ",r.id),a.clearExpenseForm(),g.toggleExpenseForm(!1),a.fetchEntries()}catch(r){console.error("Error adding document: ",r)}},clearForm:()=>{a.fIncomeAmt.value="",a.fIncomeSource.value=""},clearExpenseForm:()=>{a.fExpenseTxt.value="",a.fExpenseAmt.value="",a.fExpenseCategory.value=""},handleChatMessage:async function(){const e=this.chatInput.value.trim();if(e){if(this.appendMessage("You: "+e),e.toLowerCase().startsWith("add income")){const t=e.replace("add income","").trim();t?(this.fIncomeAmt.value=t,await this.saveIncome(),this.appendMessage("Bot: Income added successfully!")):this.appendMessage("Bot: Please specify an amount for the income.")}else if(e.toLowerCase().startsWith("add expense")){const t=e.replace("add expense","").trim().split(" ");if(t.length>=2){const n=t[0],o=t.slice(1).join(" ");this.fExpenseAmt.value=n,this.fExpenseCategory.value=o,await this.saveExpense(),this.appendMessage("Bot: Expense added successfully!")}else this.appendMessage("Bot: Please specify an amount and category for the expense.")}else{const t=await Oe(e);this.appendMessage("Bot: "+t)}this.chatInput.value=""}},appendMessage:function(e){const t=document.createElement("div");t.textContent=e,t.className="history",this.chatHistory.appendChild(t),this.chatHistory.scrollTop=this.chatHistory.scrollHeight}};window.onload=()=>{a.init(),document.getElementById("newIncomeBtn").addEventListener("click",()=>{g.toggleIncomeForm(!0)}),document.getElementById("newExpenseBtn").addEventListener("click",()=>{g.toggleExpenseForm(!0)}),a.hIncomeForm.addEventListener("submit",e=>{e.preventDefault(),a.saveIncome()}),a.hExpenseForm.addEventListener("submit",e=>{e.preventDefault(),a.saveExpense()}),document.getElementById("incomeFormEnd").addEventListener("click",()=>{g.toggleIncomeForm(!1)}),document.getElementById("expenseFormEnd").addEventListener("click",()=>{g.toggleExpenseForm(!1)})};
