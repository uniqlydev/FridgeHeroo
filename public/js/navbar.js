document.addEventListener ('DOMContentLoaded', () => {

    const home = document.getElementById('home');
    const products = document.getElementById('products');
    const superchef = document.getElementById('superchef');

    function handleNavbarClick(page) {
        window.location.href = `/${page}`;
    }

    document.getElementById('cart').addEventListener('click', function() {
        handleNavbarClick('cart');
    });

    
    document.getElementById('fridge').addEventListener('click', function() {
        handleNavbarClick('fridge');
    });

    home.addEventListener('click', function() {
        handleNavbarClick('');
    });

    products.addEventListener('click', function() {
        handleNavbarClick('order/fruit');
    });

    superchef.addEventListener('click', function() {
        handleNavbarClick('superchef');
    });

});