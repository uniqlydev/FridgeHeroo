document.addEventListener ('DOMContentLoaded', () => {

    function handleLabClick(page) {
        window.location.href = `/order/dairy/${page}`;
    }

    document.getElementById('egg').addEventListener('click', function() {
        handleLabClick('egg');
    });

    document.getElementById('cheese').addEventListener('click', function() {
        handleLabClick('cheese');
    });

    document.getElementById('butter').addEventListener('click', function() {
        handleLabClick('butter');
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