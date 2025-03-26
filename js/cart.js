document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartCount();

    document.getElementById('confirmPayment').addEventListener('click', () => {
        processPayment();
    });
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="product-name">${item.name}</td>
            <td class="product-price">${item.price.toLocaleString('vi-VN')} VNĐ</td>
            <td><input type="number" class="product-quantity" value="${item.quantity}" min="1" onchange="updateItemTotal(this, '${item.id}')"></td>
            <td class="product-total">${(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</td>
            <td><button class="btn btn-danger" onclick="removeItem(this, '${item.id}')">Xóa</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    updateTotal();
}

function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Giỏ hàng của bạn đang trống.');
        return;
    }

    // Show confirmation modal
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

function processPayment() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Giỏ hàng của bạn đang trống.');
        return;
    }

    // Collect cart data
    const items = cartItems.map(item => ({
        product: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
    }));

    // Calculate total amount
    const totalAmount = document.getElementById('total').innerText;

    // Send data to server or display confirmation
    // For demonstration, we'll just log the data and show an alert
    console.log('Checkout data:', { items, totalAmount });
    alert('Thanh toán thành công! Tổng cộng: ' + totalAmount);

    // Clear cart after checkout
    localStorage.removeItem('cart');
    loadCartItems();
    updateCartCount();

    // Hide confirmation modal
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    confirmationModal.hide();
}

function removeItem(button, id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function updateItemTotal(input, id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(input.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

function updateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').innerText = total.toLocaleString('vi-VN') + ' VNĐ';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').innerText = cartCount;
}