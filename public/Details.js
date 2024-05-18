function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to display product details
function displayProductDetails(product) {
	
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <div class=" mb-3 row">
            <div class="col-4" >
			<img src="${product.image}" class="card-img-top " alt="${product.title}"  height="250em">
			<p class="card-text mt-4"><strong>Price:</strong> $${product.price}</p>
			<button class="btn btn-danger w-100 mt-4" onclick="AddClick(${product.id})">Buy Now</button>
			<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_OBqX0gO5OHQWWE" async> </script> </form>
			</div>
            <div class="card-body col-8 d-flex flex-wrap" style="aligh-item-center">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Rating:</strong> ${product.rating.rate} <span class="bi bi-star-fill text-success"></span> (${product.rating.count} reviews)</p>
            </div>
        </div>
    `;
}
function bodyload(){
	displayProductDetails();
}

// Function to fetch and show product details
function showProductDetails() {
    const productId = getQueryParam('id');
	console.log(productId);
    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(product => displayProductDetails(product))
			
            .catch(err => console.error('Error fetching product details:', err));
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
    }
}

// Load product details when the page is loaded
window.onload = showProductDetails;
