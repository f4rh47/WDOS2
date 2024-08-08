document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const orderTableBody = document.querySelector('#orderTable tbody');
    const totalPriceElement = document.getElementById('totalPrice');
    const buyNowButton = document.getElementById('buyNow');
    const addToFavouritesButton = document.getElementById('addToFavourites');
    const applyFavouritesButton = document.getElementById('applyFavourites');

    // menu 
    const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

    const prices = {
        apples: 1500,
        bananas: 800,
        oranges: 1600,
        pineapple: 900,
        mango: 700,
        strawberry: 500,

        carrots: 450,
        broccoli: 5000,
        brinjal: 400,
        garlic: 600,
        potato: 540,
        beans: 900,

        milk: 400,
        cheese: 1500,
        yoghurt: 120,
        flavoredMilk: 150,
        butter: 600,
        milkPowder: 2500,

        chicken: 1100,
        beef: 2500,
        mutton: 5000,
        prawns: 1700,
        cuttlefish: 2700,

        flour: 500,
        sugar: 400,
        bakingPowder: 380,
        vanillaEssence: 200,
        bread: 300,
        cookies: 320
    };

    function calculateTotal() {
        let total = 0;
        orderTableBody.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.querySelector('.item-price').textContent.replace('Rs.', ''));
            total += price;
        });
        totalPriceElement.textContent = `Rs.${total.toFixed(2)}`;
    }

    function addItemToCart(item, quantity, price) {
        const existingRow = [...orderTableBody.rows].find(row => row.cells[0].textContent === item);

        if (existingRow) {
            const quantityCell = existingRow.cells[1];
            const priceCell = existingRow.cells[2];

            const existingQuantity = parseFloat(quantityCell.textContent);
            const newQuantity = existingQuantity + quantity;
            quantityCell.textContent = newQuantity.toFixed(2);

            const existingPrice = parseFloat(priceCell.textContent.replace('Rs.', ''));
            const newPrice = existingPrice + (quantity * price);
            priceCell.textContent = `Rs.${newPrice.toFixed(2)}`;
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item}</td>
                <td>${quantity}</td>
                <td class="item-price">Rs.${(quantity * price).toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
        }

        calculateTotal();
        alert(`${quantity} ${item} added to the cart.`);
    }

    function handleOrderFormSubmit() {
        orderTableBody.innerHTML = '';
        const formData = new FormData(orderForm);
        formData.forEach((value, key) => {
            if (value > 0) {
                const item = key.split('[')[1].split(']')[0];
                addItemToCart(item, value, prices[item]);
            }
        });
        alert('Order submitted successfully!');
    }

    function saveToFavourites() {
        const items = [];
        orderTableBody.querySelectorAll('tr').forEach(row => {
            const item = row.children[0].textContent;
            const quantity = row.children[1].textContent;
            items.push({ item, quantity });
        });
        localStorage.setItem('favourites', JSON.stringify(items));
        alert('Order saved to favourites!');
    }
    

    function applyFavourites() {
        const items = JSON.parse(localStorage.getItem('favourites'));
        if (items) {
            orderTableBody.innerHTML = '';
            items.forEach(({ item, quantity }) => {
                const normalizedItem = item.toLowerCase().replace(/\s+/g, '-');
                if (prices[normalizedItem] !== undefined) {
                    addItemToCart(normalizedItem, parseFloat(quantity), prices[normalizedItem]);
                } else {
                    console.error(`Price for item "${item}" not found`);
                }
            });
            alert('Favourite order applied!');
        } else {
            alert('No favourite order found!');
        }
    }
    

    buyNowButton.addEventListener('click', handleOrderFormSubmit);
    addToFavouritesButton.addEventListener('click', saveToFavourites);
    applyFavouritesButton.addEventListener('click', applyFavourites);

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            const input = button.previousElementSibling;
            const quantity = parseFloat(input.value);

            if (!isNaN(quantity) && quantity > 0) {
                addItemToCart(itemName, quantity, itemPrice);
                input.value = '';
            } else {
                alert('Please enter a valid quantity.');
            }
        });
    });
});
