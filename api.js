   
   function LoadCategory(){
        fetch("https://fakestoreapi.com/products/categories")
        .then(function(res){
                return res.json();
        })
        .then(function(categories){
            categories.unshift("all");
            categories.forEach(function(category){
                const option = document.createElement("option");
                option.text = category.toUpperCase();
                option.value = category;
                document.getElementById('LstCategory').appendChild(option);
            })
        })
    };

    function LoadProducts(url){
        document.querySelector("main").innerHTML = "";
        fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(products){
            products.forEach(function(product){
                const card = document.createElement("div");
                card.className = "card m-2 p-2"
                card.style.width = "18rem";
                card.innerHTML = `<img src=${product.image} class="card-img-top" height="160em" alt=${product.title}>
                <div class="card-header" style="height:7em;overflow:auto;">
                <p>${product.title}</p>
                </div>
                <div class="card-body">
                <dl>
                <dt>Price</dt>
                <dd>$ ${product.price}</dd>
                <dt>Rating</dt>
                <dd>${product.rating.rate} <span class="bi bi-star-fill text-success"></span>
                ${product.rating.count}</dd>
                </dl>
                </div>
                <div class="card-footer">
                <button class="btn btn-danger w-100" onclick="AddClick(${product.id})">
                Add to Cart
                <span class="bi bi-cart">
                </button>
                </div>
                `;
                document.querySelector("main").appendChild(card);
            })
        })
    }

    function bodyload(){
        LoadCategory();
        LoadProducts("https://fakestoreapi.com/products");
        GetCount();
    }

    function changeCategory(){
        const CategoryName = document.getElementById("LstCategory").value;
        if(CategoryName=="all"){  
            LoadProducts("https://fakestoreapi.com/products");
        }else{
            LoadProducts(`https://fakestoreapi.com/products/category/${CategoryName}`)
        }
    }

    function NavClick(){
       LoadProducts("https://fakestoreapi.com/products"); 
    }
    
    function ElectronicsClick(){
        LoadProducts("https://fakestoreapi.com/products/category/electronics")
    }

    function MenClothing(){
        LoadProducts("https://fakestoreapi.com/products/category/men's clothing");
    }
    function WomenClothing(){
        LoadProducts("https://fakestoreapi.com/products/category/women's clothing")
    }

    function Jewelery(){
        LoadProducts("https://fakestoreapi.com/products/category/jewelery")
    }

    var cartItems = [];

    function GetCount(){
        document.getElementById("lblCount").innerHTML= cartItems.length;
    }

    function AddClick(id){
        fetch(`https://fakestoreapi.com/products/${id}`)
         .then(function(res){
            return res.json();
         })
         .then(function(product){
            cartItems.push(product);
            alert(`${product.title} \n Added to Cart`);
            GetCount();
         })
    }
    function ShowCart(){
        document.querySelector("tbody").innerHTML = "";
        cartItems.map(function(item){
            const tr = document.createElement("tr");
            const tdTitle= document.createElement("td");
            const tdPrice=document.createElement("td");
            const tdImage= document.createElement("td");
            const tdDelete = document.createElement("td");

            tdTitle.innerHTML = item.title;
            tdPrice.innerHTML = item.price;
            tdImage.innerHTML = `<img src=${item.image} width="50" height="50">`;
            tdDelete.innerHTML = `<button class="bi bi-trash btn btn-danger" id="DeleteButton" onclick="DeleteClick(${item.id})"></button>`
            
            tr.appendChild(tdTitle);
            tr.appendChild(tdPrice);
            tr.appendChild(tdImage);
            tr.appendChild(tdDelete);
            document.querySelector("tbody").appendChild(tr);
            
        })
    }
    
    function DeleteClick(id){
        const filterCart = cartItems.filter((item)=>{
            return item.id!== id
        })
        cartItems=[];
       filterCart.forEach((item)=>{

        cartItems.push(item)
       })
       ShowCart();
       alert(`Proudct Id ${id} Deleted`)
    }