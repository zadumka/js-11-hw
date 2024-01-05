import{a as u,i as d,S as b}from"./assets/vendor-4fb3e0b3.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const r={gallery:document.querySelector(".gallery"),form:document.querySelector(".search-form"),input:document.querySelector("input"),loadBtn:document.querySelector(".load-more")},L="41029112-ec6e065fca3f0d308b81a7ee5";u.defaults.baseURL="https://pixabay.com/api/";let i=1,c=null;r.form.addEventListener("submit",async o=>{o.preventDefault(),r.gallery.innerHTML="",i=1,c=r.input.value.trim(),c&&m(i,c).then(a=>f(a))});r.loadBtn.addEventListener("click",v);async function v(){r.loadBtn.classList.add("hidden"),i+=1,m(i,c).then(o=>{if(f(o),i===Math.ceil(o.data.totalHits/40)){d.show({message:"We're are sorry, but you've reached the end of search results.",position:"topRight"}),r.loadBtn.classList.add("hidden");return}})}async function m(o,a){const n=new URLSearchParams({key:L,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}),s=await u.get(`?${n}`);if(i===1){if(s.data.totalHits===0){d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.show({message:`Hooray! We found ${s.data.totalHits} images.`,position:"topRight"})}return s}async function f(o){const a=o.data.hits.map(({webformatURL:e,largeImageURL:t,tags:l,likes:p,views:h,comments:g,downloads:y})=>`<a href="${t}"><div class="photo-card">
  <img class="image" src="${e}" alt="${l}" loading="lazy" />
  <span class="loader"></span>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${p}
    </p>
    <p class="info-item">
      <b>Views</b><br>${h}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${g}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${y}
    </p>
  </div>
  </div></a>`).join("");r.gallery.innerHTML+=a,r.images=document.querySelectorAll(".image"),[...r.images].map(e=>{e.addEventListener("load",w(e))});const{height:n}=r.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:n/2,behavior:"smooth"}),r.loadBtn.classList.remove("hidden"),new b(".gallery a",{}).refresh()}function w(o){o.nextElementSibling.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
