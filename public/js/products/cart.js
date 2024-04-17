document.addEventListener('DOMContentLoaded', function() {
    const addToCart = document.getElementById('add-to-cart');
    const quantity = document.getElementById('quantity');

    document.getElementById('add').addEventListener('click', function() {
        quantity.innerText = parseInt(quantity.innerText) + 1;
    })

    document.getElementById('subtract').addEventListener('click', function() {
        if (parseInt(quantity.innerText) > 1) {
            quantity.innerText = parseInt(quantity.innerText) - 1;
        }
    });

    addToCart.addEventListener('click', function() {
        const product_name = document.getElementById('product_name').innerText;
        let quantity_value = parseInt(quantity.innerText);

        const data = {
            "item": product_name,
            "quantity": quantity_value
        }

        fetch('/api/cart/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        });
    });

    const publishCart = document.getElementById('publish');

    publishCart.addEventListener('click', function() {
        fetch('/api/cart/publishCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                alert('Cart published successfully');
            }else {
                alert('Cart is empty');
            }
        }).catch(error => {
            console.log(error);
        });
    });
})