/**
 * E-Commerce Frontend JavaScript
 * Handles product fetching, cart management, and dynamic updates
 */

// Global state
let products = [];
let cart = [];
let totalRevenue = 0;

// API endpoint
const API_URL = 'http://localhost:5000/api/products';

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartBadge();
});

/**
 * Scroll to products section smoothly
 * Called when "Shop Now" button is clicked
 */
function scrollToProducts() {
    const productsSection = document.getElementById('productsSection');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Fetch products from the backend API
 */
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        products = await response.json();
        displayProducts(products);
        updateTotalProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        displayError('Failed to load products. Make sure the backend server is running on http://localhost:5000');
    }
}

/**
 * Display products in the products grid
 * @param {Array} productsList - Array of product objects
 */
function displayProducts(productsList) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }
    
    if (productsList.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products available</div>';
        return;
    }
    
    productsGrid.innerHTML = productsList.map(product => `
        <div class="product-card">
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="product-image"
                onerror="this.src='https://via.placeholder.com/500?text=Product+Image'"
            >
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <button 
                    class="add-to-cart-btn" 
                    onclick="addToCart(${product.id})"
                    aria-label="Add ${product.name} to cart"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Add a product to the cart
 * @param {number} productId - ID of the product to add
 */
function addToCart(productId) {
    // Find the product by ID
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Add product to cart
    cart.push(product);
    
    // Update total revenue
    totalRevenue += product.price;
    
    // Update UI
    updateCartBadge();
    updateTotalRevenue();
    updateCartDisplay();
    
    // Show visual feedback
    showCartFeedback();
}

/**
 * Update the cart badge with current cart count
 */
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
        
        // Add animation when cart is updated
        if (cart.length > 0) {
            cartBadge.style.animation = 'none';
            setTimeout(() => {
                cartBadge.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
    }
}

/**
 * Update total products count in analytics
 */
function updateTotalProducts() {
    const totalProductsElement = document.getElementById('totalProducts');
    if (totalProductsElement) {
        totalProductsElement.textContent = products.length;
    }
}

/**
 * Update total revenue in analytics
 */
function updateTotalRevenue() {
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        totalRevenueElement.textContent = `₹${totalRevenue.toFixed(2)}`;
        
        // Add animation effect
        totalRevenueElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            totalRevenueElement.style.transform = 'scale(1)';
        }, 200);
    }
}

/**
 * Show visual feedback when item is added to cart
 */
function showCartFeedback() {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
}

/**
 * Display error message if products fail to load
 * @param {string} message - Error message to display
 */
function displayError(message) {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="loading" style="color: #ef4444;">
                <p>${message}</p>
                <button 
                    onclick="fetchProducts()" 
                    style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;"
                >
                    Retry
                </button>
            </div>
        `;
    }
}

// Add CSS animation for cart badge pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);

/**
 * Open cart modal
 */
function openCartModal() {
    const modal = document.getElementById('cartModalOverlay');
    if (modal) {
        modal.classList.add('active');
        updateCartDisplay();
        updatePaymentAmount();
    }
}

/**
 * Close cart modal
 */
function closeCartModal() {
    const modal = document.getElementById('cartModalOverlay');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Switch between cart tabs
 * @param {string} tabName - Name of the tab to switch to
 */
function switchCartTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.cart-tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.cart-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to corresponding tab button
    const tabMap = {
        'cart': 0,
        'payment': 1,
        'orders': 2,
        'analysis': 3
    };
    
    if (tabMap[tabName] !== undefined && tabs[tabMap[tabName]]) {
        tabs[tabMap[tabName]].classList.add('active');
    }
    
    // Update payment amount if switching to payment tab
    if (tabName === 'payment') {
        updatePaymentAmount();
    }
}

/**
 * Update cart display
 */
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Add some products to get started!</p>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
    } else {
        // Calculate total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Display cart items
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" 
                     onerror="this.src='https://via.placeholder.com/500?text=Product+Image'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
        
        // Update total
        if (cartTotal) {
            cartTotal.textContent = `₹${total.toFixed(2)}`;
        }
        
        if (cartSummary) cartSummary.style.display = 'block';
    }
}

/**
 * Remove item from cart
 * @param {number} index - Index of the item to remove
 */
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        
        // Update total revenue
        totalRevenue -= removedItem.price;
        
        // Update UI
        updateCartBadge();
        updateTotalRevenue();
        updateCartDisplay();
        updatePaymentAmount();
    }
}

/**
 * Update payment amount
 */
function updatePaymentAmount() {
    const paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        paymentAmount.textContent = `₹${total.toFixed(2)}`;
    }
}

/**
 * Process payment
 */
function processPayment() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Simulate payment processing
    alert(`Payment of ₹${total.toFixed(2)} processed successfully!\n\nThank you for your purchase!`);
    
    // Clear cart after successful payment
    cart = [];
    totalRevenue = 0;
    updateCartBadge();
    updateTotalRevenue();
    updateCartDisplay();
    updatePaymentAmount();
    
    // Switch to orders tab to show the new order
    switchCartTab('orders');
    
    // Close modal after a delay
    setTimeout(() => {
        closeCartModal();
    }, 2000);
}

/**
 * Switch analysis period (monthly/yearly)
 * @param {string} period - 'monthly' or 'yearly'
 */
function switchAnalysisPeriod(period) {
    const monthlyAnalysis = document.getElementById('monthlyAnalysis');
    const yearlyAnalysis = document.getElementById('yearlyAnalysis');
    const tabButtons = document.querySelectorAll('.analysis-tab-btn');
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback: activate based on period
        tabButtons.forEach(btn => {
            if ((period === 'monthly' && btn.textContent.trim() === 'Monthly') ||
                (period === 'yearly' && btn.textContent.trim() === 'Yearly')) {
                btn.classList.add('active');
            }
        });
    }
    
    if (period === 'monthly') {
        if (monthlyAnalysis) monthlyAnalysis.style.display = 'flex';
        if (yearlyAnalysis) yearlyAnalysis.style.display = 'none';
    } else {
        if (monthlyAnalysis) monthlyAnalysis.style.display = 'none';
        if (yearlyAnalysis) yearlyAnalysis.style.display = 'flex';
    }
}

