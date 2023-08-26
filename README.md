# RestaurantsDAPP

Welcome to the Restaurants Decentralized application. This is the basic template showing how can we convert our food ordering websites into decentralized applications.

Here are few commands U have to use once you download this repo:
1. npm install -g truffle
2. 
3. truffle init

4. ganache setup
-> npm install -g ganache-cli
-> ganache-cli --port 7545 --networkId 5777
   
5. npm install @truffle/hdwallet-provider
At this stage, u will finf a truffle-config.js file. update the file with the following code:
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: 'peanut rebuild shy luggage spray proof pond lucky suspect voyage bag wave' // Replace with your actual mnemonic
        },
        providerOrUrl: `https://sepolia.infura.io/v3/${'4289a81dfe4343519e041c173ae4c408'}` // Replace with your Infura API key
      }),
      network_id: 11155111,      // Replace with a unique network ID for your private network
      gas: 10000000,           // Adjust gas limit according to your contract's complexity
      gasPrice: 10000000000   // Adjust gas price as needed
    }
  },
  compilers: {
    solc: {
      version: "0.8.0" // Use the required version of the Solidity compiler
    }
  },
  db: {
    // Truffle DB settings
    enabled: false,
    host: "127.0.0.1",
    adapter: {
      name: "indexeddb",
      settings: {
        directory: ".db"
      }
    }
  }
};
Also add the 1_deploy_restaurants.js file in the migrations folder. Add the following content into it: 
const Restaurants = artifacts.require("Restaurants");

module.exports = function (deployer) {
  deployer.deploy(Restaurants);
};

5. truffle migrate
-> truffle migrate --network sepolia
After this u will find a build folder. From there copy the ABI of the restaurants.sol contract and paste it in the ABI section.

7. truffle console
-> truffle console --network sepolia
   
8. get addresses
-> Restaurants.deployed().then(instance => instance.address)
With this u will obtain the address of your contract. Add this to your address section in the app.js file

object creation: 
-> const Restaurants = artifacts.require('Restaurants');
-> const restaurantsInstance = await Restaurants.deployed();
   
Adding restaurant: 
-> await restaurantsInstance.addRestaurant('Dominos', 'Amritsar'); 

Adding its outlets: 
-> await restaurantsInstance.addOutlet(0, 'Outlet 1', 'Mall Road', 4);

Adding the food item of a particular outlet:
-> await restaurantsInstance.addFoodItem(0, 0, 'Pizza', 180);
