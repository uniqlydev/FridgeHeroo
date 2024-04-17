document.addEventListener ('DOMContentLoaded', () => {

    function handleLabClick(page) {
        window.location.href = `/order/vegetable/${page}`;
    }

    document.getElementById('bellpepper').addEventListener('click', function() {
        handleLabClick('bellpepper');
    });

    document.getElementById('onion').addEventListener('click', function() {
        handleLabClick('onion');
    });

    document.getElementById('eggplant').addEventListener('click', function() {
        handleLabClick('eggplant');
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