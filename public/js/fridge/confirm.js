document.addEventListener('DOMContentLoaded', function() {
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    const item = document.getElementById('item');
    const quantity = document.getElementById('quantity');

    yes.addEventListener('click', function() {
        // POST req to /api/fridge/deduct
        fetch('/api/fridge/deduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: item.innerText,quantity: quantity.value})
        }).then( response => {
            if (response.ok) {
                alert(`Deducting ${quantity.innerText} ${item.innerText} from the fridge`);
                // Redirect to /fridge
                window.location.href = '/fridge';
            } else {
                alert('Failed to deduct item from the fridge');
            }
        }).catch( error => {
            console.log(error);
        });
    });

    no.addEventListener('click', function() {
        // Redirect to /fridge
        window.location.href = '/fridge';
    });
});