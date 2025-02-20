// Slide Functionality (if applicable)
let currentSlide = 0;
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveToSlide(slideIndex) {
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    const offset = -slideIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    currentSlide = slideIndex;
}

document.querySelector('.left-arrow')?.addEventListener('click', () => {
    moveToSlide(currentSlide - 1);
});

document.querySelector('.right-arrow')?.addEventListener('click', () => {
    moveToSlide(currentSlide + 1);
});

// Optional: Auto Slide
// setInterval(() => {
//     moveToSlide(currentSlide + 1);
// }, 5000);

// Contact Form Submission
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
});

// Fade-in Animation for Hero Content
document.addEventListener('DOMContentLoaded', function () {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 500);
    }
});

// Search and Filter Functionality
document.getElementById('search-input').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('price-filter').addEventListener('change', filterProducts);

function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    const selectedPriceRange = document.getElementById('price-filter').value;

    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach((product) => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseFloat(product.querySelector('strong').textContent.replace('$', ''));

        // Check if the product matches the search term, category, and price range
        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;
        const matchesPrice = selectedPriceRange === 'all' || checkPriceRange(productPrice, selectedPriceRange);

        if (matchesSearch && matchesCategory && matchesPrice) {
            product.style.display = 'block'; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}

function checkPriceRange(price, range) {
    switch (range) {
        case '0-50':
            return price >= 0 && price <= 50;
        case '50-100':
            return price > 50 && price <= 100;
        case '100-500':
            return price > 100 && price <= 500;
        case '500+':
            return price > 500;
        default:
            return true;
    }
}

