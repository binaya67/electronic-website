
// auth.js

// Check if users exist in local storage, if not, initialize an empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// Sign Up Functionality
document.getElementById("signup-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("User already exists. Please login.");
        window.location.href = "login.html";
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up successful! Please login.");
    window.location.href = "login.html";
});

// Login Functionality
document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Find user
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
});
