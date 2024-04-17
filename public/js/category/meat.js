document.addEventListener ('DOMContentLoaded', () => {

    function handleLabClick(page) {
        window.location.href = `/order/meat/${page}`;
    }

    document.getElementById('steak').addEventListener('click', function() {
        handleLabClick('steak');
    });

    document.getElementById('shrimp').addEventListener('click', function() {
        handleLabClick('shrimp');
    });

    document.getElementById('chicken').addEventListener('click', function() {
        handleLabClick('chicken');
    });


});