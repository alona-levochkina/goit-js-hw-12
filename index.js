import{a as A,S as M,i as n}from"./assets/vendor-DqB7j7Ix.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const B="50849139-d21d04a61911bfdf6ebb62f1b",$="https://pixabay.com/api/";async function y(o,e){try{const a=await A.get($,{params:{key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}});return console.log(a),a.data}catch(a){throw console.log("catch error",a),a}}const h=document.querySelector(".gallery"),L=document.querySelector(".loader"),b=document.querySelector(".button-load");let f;function v(o){const e=o.map(({webformatURL:a,largeImageURL:c,tags:t,likes:r,views:i,comments:R,downloads:q})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${c}">
                <img class="gallery-image"
                    src="${a}"  
                    alt="${t}"/>
                <div class="image-info">
                    <p class="info-item">
                        <span class="info-label">Likes</span>
                        <span class="info-value">${r}</span>
                    </p>
                    <p class="info-item">
                        <span class="info-label">Views</span>
                        <span class="info-value">${i}</span>
                    </p> 
                    <p class="info-item">
                        <span class="info-label">Comments</span>
                        <span class="info-value">${R}</span>
                    </p> 
                    <p class="info-item">
                        <span class="info-label">Downloads</span>
                        <span class="info-value">${q}</span>
                    </p>     
                </div>
            </a>
        </li>
        `).join("");h.insertAdjacentHTML("beforeend",e),f?f.refresh():f=new M(".gallery a",{captionsData:"alt",captionDelay:250,close:!0})}function E(){h.innerHTML=""}function w(){L.classList.remove("hidden")}function s(){L.classList.add("hidden")}function p(){b.classList.remove("hidden")}function u(){b.classList.add("hidden")}const S=document.querySelector("form"),m=S.elements["search-text"],O=document.querySelector(".button-load");let d="",l=1,g=0;S.addEventListener("submit",x);O.addEventListener("click",C);u();async function x(o){if(o.preventDefault(),d=m.value.trim(),l=1,g=0,E(),u(),w(),d===""){n.error({message:"Please enter a search query.",position:"topRight"}),s();return}try{const e=await y(d,l);if(!e||!Array.isArray(e.hits)){n.error({message:"Received incorrect data while loading additional images. Please try again.",position:"topRight"}),s();return}if(g=e.totalHits,e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s();return}v(e.hits),s(),P()}catch(e){console.log("catch",e),n.error({message:"Try again!",position:"topRight"}),s()}finally{m.value=""}}async function C(){l+=1,w(),u();try{const o=await y(d,l);if(!o||!Array.isArray(o.hits)){n.error({message:"Received incorrect data while loading additional images. Please try again.",position:"topRight"}),s(),p();return}v(o.hits),s(),P(),I()}catch(o){console.log("catch",o),n.error({message:"An error occurred while loading more images",position:"topRight"}),s(),p()}}function P(){l*15>=g?(u(),n.info({message:"We're sorry, but you've reached the end of search results!"})):p()}function I(){const o=h.firstElementChild;if(o){const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
