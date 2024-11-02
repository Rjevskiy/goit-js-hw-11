import{S as c,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();async function d(s){const t=`https://pixabay.com/api/?key=46859112-8db04929d193e6e9d044d366e&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`,e=await fetch(t);if(!e.ok)throw new Error("Ошибка при получении данных");return(await e.json()).hits}function u(s){const o=document.getElementById("gallery");o.innerHTML="";const n=s.map(t=>`
        <div class="gallery-item">
            <a href="${t.largeImageURL}" class="lightbox">
                <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p>Likes: ${t.likes}</p>
                <p>Views: ${t.views}</p>
                <p>Comments: ${t.comments}</p>
                <p>Downloads: ${t.downloads}</p>
            </div>
        </div>
    `).join("");o.innerHTML=n}const p=document.getElementById("search-form"),f=document.getElementById("search-input"),l=document.getElementById("loader"),m=document.getElementById("gallery");let y=new c(".gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250});p.addEventListener("submit",s=>{s.preventDefault();const o=f.value.trim();if(!o){a.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}l.style.display="block",m.innerHTML="",d(o).then(n=>{if(n.length===0){a.info({title:"Sorry",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}u(n),y.refresh()}).catch(n=>{a.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}).finally(()=>{l.style.display="none"})});
//# sourceMappingURL=index.js.map
