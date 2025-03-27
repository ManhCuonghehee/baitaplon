document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.parentElement.querySelector('.card-title').innerText;
            const productPrice = button.parentElement.querySelector('.card-text').innerText.replace('Giá: ', '').replace(' VNĐ', '').replace(/\./g, '');

            addItemToCart(productId, productName, parseInt(productPrice), 1);
            updateCartCount();
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        });
        
    });

    updateCartCount();
});

function addItemToCart(id, name, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').innerText = cartCount;
}
//dang ki
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));

    // Chuyển đến trang đăng nhập
    window.location.href = 'login.html';
});
// dang nhap
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Kiểm tra thông tin đăng nhập
    if (user && user.email === email && user.password === password) {
        // Lưu tên người dùng vào localStorage
        localStorage.setItem('loggedInUser', user.name);
        // Chuyển đến trang chủ
        window.location.href = 'index.html';
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
});