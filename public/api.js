function LoadCategory(){fetch("https://fakestoreapi.com/products/categories").then((function(t){return t.json()})).then((function(t){t.unshift("all"),t.forEach((function(t){const e=document.createElement("option");e.text=t.toUpperCase(),e.value=t,document.getElementById("LstCategory").appendChild(e)}))}))}function LoadProducts(t){document.querySelector("main").textContent="",fetch(t).then((function(t){return t.json()})).then((function(t){t.forEach((function(t){const e=document.createElement("div");e.className="card m-2 p-2",e.style.width="18rem",e.innerHTML=`<a href="./Details.html" onclick="PhotoClick()"><img src="${t.image}" class="card-img-top" height="160em" alt=${t.title}></a>\n                <div class="card-header" style="height:7em;overflow:auto;">\n                <p>${t.title}</p>\n                </div>\n                <div class="card-body">\n                <dl>\n                <dt>Price</dt>\n                <dd>$ ${t.price}</dd>\n                <dt>Rating</dt>\n                <dd>${t.rating.rate} <span class="bi bi-star-fill text-success"></span>\n                ${t.rating.count}</dd>\n                </dl>\n                </div>\n                <div class="card-footer">\n                <button class="btn btn-danger w-100" onclick="AddClick(${t.id})">\n                Add to Cart\n                <span class="bi bi-cart">\n                </button>\n                </div>\n                `,document.querySelector("main").appendChild(e)}))}))}function bodyload(){LoadCategory(),LoadProducts("https://fakestoreapi.com/products"),GetCount()}function changeCategory(){const t=document.getElementById("LstCategory").value;LoadProducts("all"==t?"https://fakestoreapi.com/products":`https://fakestoreapi.com/products/category/${t}`)}function NavClick(){LoadProducts("https://fakestoreapi.com/products")}function ElectronicsClick(){LoadProducts("https://fakestoreapi.com/products/category/electronics")}function MenClothing(){LoadProducts("https://fakestoreapi.com/products/category/men's clothing")}function WomenClothing(){LoadProducts("https://fakestoreapi.com/products/category/women's clothing")}function Jewelery(){LoadProducts("https://fakestoreapi.com/products/category/jewelery")}function GetCount(){document.getElementById("lblCount").innerHTML=cartItems.length}function AddClick(t){fetch(`https://fakestoreapi.com/products/${t}`).then((function(t){return t.json()})).then((function(t){cartItems.push(t),alert(`${t.title} \n Added to Cart`),GetCount()}))}function ShowCart(){document.querySelector("tbody").innerHTML="";let t=0;cartItems.map((function(e){const n=document.createElement("tr"),o=document.createElement("td"),c=document.createElement("td"),d=document.createElement("td"),r=document.createElement("td");o.innerHTML=e.title,c.innerHTML=`$${e.price.toFixed(2)}`,d.innerHTML=`<img src="${e.image}" width="50" height="50">`,r.innerHTML=`<button class="bi bi-trash btn btn-danger" id="DeleteButton" onclick="DeleteClick(${e.id})"></button>`,n.appendChild(o),n.appendChild(c),n.appendChild(d),n.appendChild(r),document.querySelector("tbody").appendChild(n),t+=e.price}));const e=document.createElement("tr"),n=document.createElement("td"),o=document.createElement("td");n.innerHTML="<strong>Total:</strong>",o.innerHTML=`<strong>$${t.toFixed(2)}</strong>`,e.appendChild(n),e.appendChild(o),document.querySelector("tbody").appendChild(e)}var cartItems=[];function DeleteClick(t){const e=cartItems.filter((e=>e.id!==t));cartItems=[],e.forEach((function(t){cartItems.push(t)})),ShowCart(),alert(`Proudct Id ${t} Deleted`)}