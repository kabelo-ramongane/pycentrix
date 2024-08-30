// Product data
const products = [
    {
        id: 1,
        name: "Smartphone",
        image: "https://via.placeholder.com/150",
        description: "High-end smartphone with advanced features.",
        status: "In Stock",
        price: 8999.99,
        rating: 4.5
    },
    {
        id: 2,
        name: "Laptop",
        image: "https://via.placeholder.com/150",
        description: "Powerful laptop for work and entertainment.",
        status: "In Stock",
        price: 14999.99,
        rating: 4.2
    },
    {
        id: 3,
        name: "Headphones",
        image: "https://via.placeholder.com/150",
        description: "Wireless noise-cancelling headphones.",
        status: "Out of Stock",
        price: 2499.99,
        rating: 4.7
    },
    // Add more products as needed
];

let cart = [];

function displayProducts(productsToShow) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><small class="text-muted">${product.status}</small></p>
                    <p class="card-text">R${product.price.toFixed(2)}</p>
                    <p class="card-text">Rating: ${product.rating}/5</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    addToCartListeners();
}

function addToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'mb-2';
        itemElement.innerHTML = `
            <div>${item.name} - R${item.price.toFixed(2)} x ${item.quantity}</div>
            <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Remove</button>
            <button class="btn btn-sm btn-secondary increase-quantity" data-id="${item.id}">+</button>
        `;
        cartItems.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    addCartItemListeners();
}

function addCartItemListeners() {
    const removeButtons = document.querySelectorAll('.remove-item');
    const increaseButtons = document.querySelectorAll('.increase-quantity');

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            increaseQuantity(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortBy = sortSelect.value;

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            return a.price - b.price;
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });

    displayProducts(sortedProducts);
}

function filterProducts() {
    const filterSelect = document.getElementById('filterSelect');
    const filterBy = filterSelect.value;

    const filteredProducts = filterBy
        ? products.filter(product => product.status === filterBy)
        : products;

    displayProducts(filteredProducts);
}

function initializeEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const filterSelect = document.getElementById('filterSelect');
    const checkoutBtn = document.getElementById('checkoutBtn');

    searchInput.addEventListener('input', searchProducts);
    sortSelect.addEventListener('change', sortProducts);
    filterSelect.addEventListener('change', filterProducts);
    checkoutBtn.addEventListener('click', () => alert('Checkout functionality not implemented'));
}

// Initialize the page
displayProducts(products);
initializeEventListeners();