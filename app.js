const catalog={
 body:{title:"Your Body Is Hiding 100 Amazing Secrets",category:"SCIENCE & THE HUMAN BODY",description:"A journey into the surprising systems, mysteries and everyday wonders of the human body. Discover how familiar things can hold extraordinary explanations.",bullets:["100 fascinating discoveries about the human body","Accessible explanations for curious readers","A digital book designed for reading at your own pace"],cover:"body"},
 brain:{title:"Your Brain Is Playing Tricks on You",category:"PSYCHOLOGY & THE MIND",description:"Explore how perception, memory and hidden mental shortcuts shape the way you experience reality. A thought-provoking look at the surprising ways the mind works.",bullets:["Five connected chapters about the mind","Explore perception, memory and everyday thinking","A digital book designed for curious readers"],cover:"brain"}
};
let cart=[];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const drawer=$("#cartDrawer"),scrim=$("#scrim"),modal=$("#bookModal");
function showCart(){drawer.classList.add("show");scrim.classList.add("show");drawer.setAttribute("aria-hidden","false")}
function hideCart(){drawer.classList.remove("show");scrim.classList.remove("show");drawer.setAttribute("aria-hidden","true")}
function hideModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
function renderCart(){
 $("#cartCount").textContent=cart.length;$("#drawerCount").textContent=`(${cart.length})`;
 const area=$("#cartItems"),bottom=$("#cartBottom");
 if(!cart.length){area.innerHTML='<div class="cart-empty"><div class="empty-symbol">↗</div><h3>Your cart is waiting.</h3><p>Explore the collection and add a book that sparks your curiosity.</p><button class="primary-btn" id="continueShopping">Explore books</button></div>';bottom.hidden=true;$("#continueShopping").onclick=()=>{hideCart();$("#books").scrollIntoView({behavior:"smooth"})};return}
 bottom.hidden=false;
 area.innerHTML=cart.map(id=>{const b=catalog[id];return `<div class="cart-item"><div class="cart-thumb">${id==="body"?"BODY<br>SECRETS":"BRAIN<br>TRICKS"}</div><div><h4>${b.title}</h4><p>Digital eBook · Price coming soon</p><button class="remove-btn" data-remove="${id}">Remove</button></div></div>`}).join("");
 $$("[data-remove]").forEach(btn=>btn.onclick=()=>{cart=cart.filter(x=>x!==btn.dataset.remove);renderCart()});
}
function openBook(id){
 const b=catalog[id];
 $("#modalContent").innerHTML=`<div class="modal-cover ${id}">${id==="body"?"YOUR BODY<br><em>IS HIDING</em><br>100 AMAZING<br>SECRETS":"YOUR BRAIN<br><em>IS PLAYING</em><br>TRICKS ON YOU"}<small>THE CURIOUS MIND</small></div><div class="modal-copy"><div class="eyebrow"><i></i>${b.category}</div><h2>${b.title}</h2><p>${b.description}</p><ul>${b.bullets.map(x=>`<li>${x}</li>`).join("")}</ul><p><strong>Price:</strong> To be announced</p><button class="primary-btn" id="addBook">Add to cart ↗</button></div>`;
 modal.classList.add("show");modal.setAttribute("aria-hidden","false");
 $("#addBook").onclick=()=>{if(!cart.includes(id))cart.push(id);renderCart();hideModal();showCart()};
}
$$("[data-open]").forEach(btn=>btn.addEventListener("click",()=>openBook(btn.dataset.open)));
$("#openCart").onclick=showCart;$("#closeCart").onclick=hideCart;$("#closeModal").onclick=hideModal;scrim.onclick=hideCart;
modal.onclick=e=>{if(e.target===modal)hideModal()};
$("#searchJump").onclick=()=>{$("#searchInput").focus();$("#books").scrollIntoView({behavior:"smooth"})};
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$$('#nav a').forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
function filterBooks(){
 const category=$(".filter.active")?.dataset.filter||"all",q=$("#searchInput").value.toLowerCase();let count=0;
 $$(".book-card").forEach(card=>{const ok=(category==="all"||card.dataset.category===category)&&card.dataset.title.toLowerCase().includes(q);card.hidden=!ok;if(ok)count++});
 $("#noResults").hidden=count!==0;
}
$$(".filter").forEach(btn=>btn.onclick=()=>{$$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");filterBooks()});
$("#searchInput").addEventListener("input",filterBooks);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){hideCart();hideModal()}});
renderCart();
