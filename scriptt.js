async function cards() {
    try {
        const url = 'https://fakestoreapi.com/products/';
        const response = await fetch(url);
        const products = await response.json();
        const container = document.getElementById('container');
        const limitedProducts = products.slice(0, 8);

        limitedProducts.forEach(product => {
            const truncatedDescription = product.description.length > 100 
                ? product.description.slice(0, 100) + '....' 
                : product.description;
            const truncatedTitle = product.title.length > 40
                ? product.title.slice(0, 40) + '...'
                : product.title;
            const productId = product.id;

            // Create the main div element for the product card
            const div = document.createElement('div');
            div.classList.add('product-card');
            
            // Create and set up the image element
            const img = document.createElement('img');
            img.classList.add('img');
            img.src = product.image;
            img.alt = product.title;
            div.appendChild(img);
            
            // Create and set up the title element
            const h2 = document.createElement('h2');
            h2.textContent = truncatedTitle; 
            div.appendChild(h2);
            
            // Create and set up the price element
            const priceP = document.createElement('p');
            priceP.classList.add('price');
            priceP.textContent = `$${product.price}`; 
            div.appendChild(priceP);
            
            // Create and set up the description element
            const descP = document.createElement('p');
            descP.textContent = truncatedDescription; 
            div.appendChild(descP);

            // Add an event listener for the click event
            div.addEventListener('click', () => {
                window.location.href = `user.html?id=${productId}`; // Redirect with productId
            });
            
            // Append the div to the container
            container.appendChild(div);
        });
    
    } catch (error) {
        console.error('Error:', error);
    }
}

async function viewDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        try {
            const userUrl = `https://fakestoreapi.com/products/${productId}`;
            const response = await fetch(userUrl);
            console.log("response",response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const productData = await response.json();
            console.log("data",productData);
            const userDetailsDiv = document.getElementById('userDetails');
            userDetailsDiv.innerHTML = `
                <div>
                <img id="img"src="${productData.image}" alt="${productData.title}">
                </div>
                <div id="data2">
                <h2>${productData.title}</h2><br>
                <p><h2>Description</h2>${productData.description}</p><br>
                <p><h2>Price: $${productData.price}</h2></p></div>
            `;
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    } else {
        console.error('No productId found in URL parameters');
    }
}

    
    // If you want to display product details on the same page
    if (window.location.pathname.includes('user.html')) {
        viewDetails();
    }

