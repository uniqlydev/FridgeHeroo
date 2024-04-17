document.addEventListener('DOMContentLoaded', function() {
    const publish = document.getElementById('publish');

    publish.addEventListener('click', async function() {
        const response = await fetch('/api/cart/publishCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (response.ok) {
                alert("Order Successful!");
                // Redirect home 
                window.location.href = "/";
            }else {
                alert("Order Failed!");
            }
        })

        const data = await response.json();
        console.log(data);
    });
});