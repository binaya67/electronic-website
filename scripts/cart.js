
// cart.js

// Initialize cart as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to add an item to the cart
function addToCart(productName, price, quantity) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If the item already exists in the cart, update the quantity
        existingItem.quantity += quantity;
    } else {
        // If the item is not in the cart, add it
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    // Update the cart count
    updateCartCount();

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to handle the "Add to Cart" button click
function handleAddToCart(event) {
    const productItem = event.target.closest('.product-item');
    
    const productName = productItem.querySelector('h3').textContent;
    const price = parseFloat(productItem.querySelector('strong').textContent.replace('$', ''));
    const quantity = parseInt(productItem.querySelector('#quantity').value);

    addToCart(productName, price, quantity);

    // Optional: Show a confirmation message
    alert(`${quantity} ${productName}(s) added to cart!`);
}

// Function to handle quantity increase
function handleIncreaseQuantity(event) {
    const quantityInput = event.target.closest('.quantity-selector').querySelector('input');
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
        quantityInput.value = quantity + 1;
    }
}

// Function to handle quantity decrease
function handleDecreaseQuantity(event) {
    const quantityInput = event.target.closest('.quantity-selector').querySelector('input');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

// Attach event listeners to all quantity increase buttons
document.querySelectorAll('#increase-quantity').forEach(button => {
    button.addEventListener('click', handleIncreaseQuantity);
});

// Attach event listeners to all quantity decrease buttons
document.querySelectorAll('#decrease-quantity').forEach(button => {
    button.addEventListener('click', handleDecreaseQuantity);
});

// Load the cart from localStorage and update the cart count
updateCartCount();


