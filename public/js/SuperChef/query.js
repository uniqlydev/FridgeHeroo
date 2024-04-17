document.addEventListener('DOMContentLoaded', async () => {
    const meal_query = document.getElementById('meal_query');
    const response_box = document.querySelector('.response-box'); // Select the container for responses

    // press enter to send query
    meal_query.addEventListener('keypress', async (e) => {
        // Get value of input
        const prompt = meal_query.value;
        if (e.key === 'Enter') {
            // Post request to /generate
            try {
                const response = await fetch('/api/gen/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to generate response');
                }

                const responseData = await response.json(); // Parse JSON response
                console.log(responseData); // Log the response data
                
                // Clear existing content in response_box
                response_box.innerHTML = '';

                // Iterate over each key-value pair in responseData
                for (const [key, value] of Object.entries(responseData)) {
                    // Create a new <p> element for each key-value pair
                    const pTag = document.createElement('p');
                    pTag.textContent = `${key}: ${JSON.stringify(value)}`; // Set the content of the <p> tag

                    // Append the <p> tag to the response box
                    response_box.appendChild(pTag);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    });
});
