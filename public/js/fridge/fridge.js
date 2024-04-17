document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('click', function() {
            // Find the item name associated with the clicked item
            const itemNameElement = this.querySelector('.itemname');
            if (itemNameElement) {
                const itemName = itemNameElement.innerText;
                window.location.href = "/fridge/" + itemName;
            }
        });
    });
});
