document.addEventListener ('DOMContentLoaded', () => {

    function handleLabClick(page) {
        window.location.href = `/order/${page}`;
    }

    document.getElementById('meat').addEventListener('click', function() {
        handleLabClick('meat');
    });

    document.getElementById('dairy').addEventListener('click', function() {
        handleLabClick('dairy');
    });

    document.getElementById('fruit').addEventListener('click', function() {
        handleLabClick('fruit');
    });

    document.getElementById('vegetable').addEventListener('click', function() {
        handleLabClick('vegetable');
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