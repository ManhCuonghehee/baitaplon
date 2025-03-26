document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.parentElement.querySelector('.card-title').innerText;
            const productPrice = button.parentElement.querySelector('.card-text').innerText.replace('Giá: ', '').replace(' VNĐ', '').replace(/\./g, '');

            addItemToCart(productId, productName, parseInt(productPrice), 1);
            updateCartCount();
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