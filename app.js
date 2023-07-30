// Assuming you have the ABI and address of the smart contracts
const restaurantsContractABI = [/* Your ABI here */];
const restaurantsContractAddress = 'YOUR_RESTAURANTS_CONTRACT_ADDRESS';

// Connect to the Ethereum network using Web3.js
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Get the instance of the smart contract
const restaurantsContract = new web3.eth.Contract(restaurantsContractABI, restaurantsContractAddress);

// Function to fetch restaurant data from the smart contract
async function fetchRestaurants() {
    const restaurantCount = await restaurantsContract.methods.getRestaurantCount().call();

    for (let i = 0; i < restaurantCount; i++) {
        const restaurant = await restaurantsContract.methods.getRestaurant(i).call();
        const restaurantCard = createRestaurantCard(restaurant);
        document.getElementById('restaurantList').appendChild(restaurantCard);
    }
}

// Function to create a restaurant card
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <p class="restaurant-location">${restaurant.location}</p>
    `;
    card.onclick = () => {
        showOutletPage(restaurant.restaurant_id);
    };
    return card;
}

// Function to show the outlet page of a specific restaurant
async function showOutletPage(restaurantId) {
    const outlets = await restaurantsContract.methods.getOutlets(restaurantId).call();
    const outletList = document.createElement('div');
    outletList.className = 'outlet-list';

    for (let i = 0; i < outlets.length; i++) {
        const outletCard = createOutletCard(outlets[i]);
        outletList.appendChild(outletCard);
    }

    const container = document.createElement('div');
    container.className = 'container';
    container.appendChild(outletList);
    document.body.innerHTML = '';
    document.body.appendChild(container);
}

// Function to create an outlet card
function createOutletCard(outlet) {
    const card = document.createElement('div');
    card.className = 'outlet-card';
    card.innerHTML = `
        <h2 class="outlet-name">${outlet.name}</h2>
        <p class="outlet-location">${outlet.location}</p>
    `;
    const foodItemList = document.createElement('ul');
    foodItemList.className = 'food-item-list';
    for (let i = 0; i < outlet.foodItems.length; i++) {
        const foodItem = outlet.foodItems[i];
        const itemPrice = web3.utils.fromWei(foodItem.price, 'ether');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="food-item-name">${foodItem.name}</span>
            <span class="food-item-price">Price: ${itemPrice} ETH</span>
            <button class="add-button" onclick="addToCart('${foodItem.name}', ${foodItem.price})">Add to Cart</button>
        `;
        foodItemList.appendChild(listItem);
    }
    card.appendChild(foodItemList);
    return card;
}

// Cart to store selected items
const cart = [];

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    const cartContainer = document.getElementById('cartContainer');
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemPrice = web3.utils.fromWei(item.price, 'ether');
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">Price: ${itemPrice} ETH</span>
        `;
        cartItems.appendChild(cartItem);
    }

    if (cart.length > 0) {
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.innerText = 'Buy';
        buyButton.onclick = buyItems;
        cartContainer.appendChild(buyButton);
    }
}

// Function to buy the items in the cart (placeholder for now)
function buyItems() {
    // Implement the logic to initiate the payment process and clear the cart
    alert('Payment process initiated. Cart cleared.');
    cart.length = 0;
    updateCartUI();
}

// Function to toggle between light and dark mode (placeholder for now)
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Fetch restaurants when the page loads
fetchRestaurants();
