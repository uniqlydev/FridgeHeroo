document.addEventListener ('DOMContentLoaded', () => {

    function handleLabClick(page) {
        window.location.href = `/order/fruit/${page}`;
    }

    document.getElementById('banana').addEventListener('click', function() {
        handleLabClick('banana');
    });

    document.getElementById('apple').addEventListener('click', function() {
        handleLabClick('apple');
    });

    document.getElementById('orange').addEventListener('click', function() {
        handleLabClick('orange');
    });

    
    function handleNavbarClick(page) {
        window.location.href = `/${page}`;
    }

    document.getElementById('cart').addEventListener('click', function() {
        handleNavbarClick('cart');
    });

    
    document.getElementById('fridge').addEventListener('click', function() {
        handleNavbarClick('fridge');
    });


});