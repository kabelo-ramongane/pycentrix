// Product data
const products = [
    {
        id: 1,
        name: "Noel Bag",
        image: "assets/products/ergonomic-bagpack.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "bags",
        price: 8999.99,
        rating: 4.5
    },
    {
        id: 2,
        name: "Everki Laptop Bag",
        image: "assets/products/everki.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "bags",
        price: 14999.99,
        rating: 4.2
    },
    {
        id: 3,
        name: "Laptop",
        image: "assets/products/laptop.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "Out of Stock",
        category: "computers",
        price: 2499.99,
        rating: 4.7
    },
    {
        id: 4,
        name: "Meta Quest",
        image: "assets/products/metaquest.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "gadgets",
        price: 8999.99,
        rating: 4.5
    },
    {
        id: 5,
        name: "Samsung TV",
        image: "assets/products/samsung.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "televisions",
        price: 14999.99,
        rating: 1
    },
    {
        id: 6,
        name: "Sony Alpha",
        image: "assets/products/sony-alpha.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "Out of Stock",
        category: "cameras",
        price: 2499.99,
        rating: 2
    },
    {
        id: 7,
        name: "Usb Gaming Mouse",
        image: "assets/products/usb-gaming-mouse.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "gadgets",
        price: 8999.99,
        rating: 4.5
    },
    {
        id: 8,
        name: "Oculus VR Headset",
        image: "assets/products/oculus.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "gadgets",
        price: 14999.99,
        rating: 4.2
    },
    {
        id: 9,
        name: "Beats Headphones",
        image: "assets/products/beats.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "Out of Stock",
        category: "gadgets",
        price: 2499.99,
        rating: 4.7
    },{
        id: 10,
        name: " Oppo Smartphone",
        image: "assets/products/oppo.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "phones",
        price: 8999.99,
        rating: 2
    },
    {
        id: 11,
        name: "Motorolla Razr",
        image: "assets/products/motorolla.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "In Stock",
        category: "phones",
        price: 14999.99,
        rating: 3
    },
    {
        id: 12,
        name: "Hisense television",
        image: "assets/products/hisense.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "Out of Stock",
        category: "televisions",
        price: 2499.99,
        rating: 1
    },
    {
        id: 13,
        name: "Galaxy Watch",
        image: "assets/products/galaxy-watch.webp",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        status: "Out of Stock",
        category: "watches",
        price: 2499.99,
        rating: 4.7
    }      
];

const PRODUCTS_PER_PAGE = 6;

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
                    <div class="star-rating mt-0" data-rating=${product.rating}>
                    <!-- 5 stars for rating -->
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                    <span class="star">&#9733;</span>
                </div>
                <div class="mt-2">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>                    
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
    <div class="item-details">
        <img src="${item.image}" alt="${item.name}" class="item-image" />
        <div class="item-info">
            <h5 class="item-name">${item.name}</h5>
           <p class="item-price">Price: <span class="item-value">R${item.price.toFixed(2)}</span></p>
            <p class="item-quantity">Quantity: <span class="item-value">${item.quantity}</span></p>
        </div>
        <div class="item-actions">
            <i class="bi bi-trash btn btn-sm btn-danger remove-item" data-id="${item.id}" aria-hidden="true"></i>
            <i class="bi bi-plus btn btn-sm btn-secondary increase-quantity" data-id="${item.id}" aria-hidden="true"></i>

        </div>
    </div>
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

/*function searchProducts() {
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
        ? products.filter(product => product.category === filterBy)
        : products;

    displayProducts(filteredProducts);
}*/

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    setupPagination(filteredProducts.length, PRODUCTS_PER_PAGE);
    displayProducts(filteredProducts.slice(0, PRODUCTS_PER_PAGE));
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

    setupPagination(sortedProducts.length, PRODUCTS_PER_PAGE);
    displayProducts(sortedProducts.slice(0, PRODUCTS_PER_PAGE));
}

function filterProducts() {
    const filterSelect = document.getElementById('filterSelect');
    const filterBy = filterSelect.value;

    const filteredProducts = filterBy
        ? products.filter(product => product.category === filterBy)
        : products;

    setupPagination(filteredProducts.length, PRODUCTS_PER_PAGE);
    displayProducts(filteredProducts.slice(0, PRODUCTS_PER_PAGE));
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

//PAGINATION
function setupPagination(totalProducts, productsPerPage) {
    const pageCount = Math.ceil(totalProducts / productsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('btn', 'btn-outline-primary', 'mx-1');
        button.addEventListener('click', () => {
            const start = (i - 1) * productsPerPage;
            const end = start + productsPerPage;
            displayProducts(products.slice(start, end));
        });
        paginationContainer.appendChild(button);
    }
}

//helper function to format numbers
function formatNumber(number, locale = 'en-UK', options = {}) {
    // Create a NumberFormat instance with the provided locale and options
    const formatter = new Intl.NumberFormat(locale, options);
    
    // Format the number and return it
    return formatter.format(number);
}

//displayProducts(products);
//initializeEventListeners();


// Initialize the page
setupPagination(products.length, PRODUCTS_PER_PAGE);
displayProducts(products.slice(0, PRODUCTS_PER_PAGE));
initializeEventListeners();