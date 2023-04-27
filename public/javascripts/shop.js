fetch('/shop')
    .then(res => {
        if (!response.ok) {
            throw new Error('Network response not ok')
        }
        return res.json();
    })
    .then(Products => {
        Products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.textContent = product.name;
            document.body.appendChild(productElement);
        });
    })
    .catch(error => {
        console.log('There was a problem with fetch operation');
    });