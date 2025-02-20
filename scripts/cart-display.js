// cart-display.js

// Retrieve the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    // Clear the cart items container
    cartItemsElement.innerHTML = '';

    // Initialize total price
    let totalPrice = 0;

    // Loop through the cart and display each item
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    // Display the total price
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Update the cart count in the header
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove the item from the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCartItems(); // Refresh the cart display
}
// Function to handle the "Buy Now" button click
function handleBuyNow() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before purchasing.');
        return;
    }

    // Simulate a purchase process
    alert('Thank you for your purchase! Your order has been placed.');

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

// Display the cart items when the page loads
displayCartItems();
// Redirect to the home page (optional)
window.location.href = 'index.html';
}

// Attach event listener to the "Buy Now" button
document.getElementById('buy-now').addEventListener('click', handleBuyNow);

// Display the cart items when the page loads
displayCartItems();