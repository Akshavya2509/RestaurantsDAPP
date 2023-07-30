// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Restaurants {
    // Restaurant name, address, outlets, and rating
    struct Restaurant {
        string name;
        string location;
        Outlet[] outlets; // Array to store outlets for each restaurant
    }

    Restaurant[] public restaurants;

    function addRestaurant(string memory _name, string memory _location) public {
        restaurants.push(Restaurant(_name, _location, new Outlet[](0))); // Initialize the outlets array
    }

    // Outlet

    struct Outlet {
        string name;
        string location;
        uint rating;
        FoodItem[] foodItems; // Array to store food items for each outlet
    }

    function addOutlet(uint restaurantIndex, string memory _name, string memory _location, uint _rating) public {
        require(restaurantIndex < restaurants.length, "Invalid restaurant index");
        restaurants[restaurantIndex].outlets.push(Outlet(_name, _location, _rating, new FoodItem[](0))); // Initialize the food items array
    }

    // Get the number of outlets for a specific restaurant
    function getOutletCount(uint restaurantIndex) public view returns (uint) {
        require(restaurantIndex < restaurants.length, "Invalid restaurant index");
        return restaurants[restaurantIndex].outlets.length;
    }

    // Get the details of a specific outlet for a restaurant
    function getOutletDetails(uint restaurantIndex, uint outletIndex) public view returns (string memory, string memory, uint) {
        require(restaurantIndex < restaurants.length, "Invalid restaurant index");
        require(outletIndex < restaurants[restaurantIndex].outlets.length, "Invalid outlet index");
        Outlet memory outlet = restaurants[restaurantIndex].outlets[outletIndex];
        return (outlet.name, outlet.location, outlet.rating);
    }

    // Get the number of restaurants
    function getRestaurantCount() public view returns (uint) {
        return restaurants.length;
    }

    // Add a food item to a specific outlet of a specific restaurant
    function addFoodItem(uint _restaurantIndex, uint _outletIndex, string memory _name, uint _price) public {
        require(_restaurantIndex < restaurants.length, "Invalid restaurant index");
        require(_outletIndex < restaurants[_restaurantIndex].outlets.length, "Invalid outlet index");

        // Add the food item to the specified outlet of the restaurant
        restaurants[_restaurantIndex].outlets[_outletIndex].foodItems.push(FoodItem(_name, _price));
    }

    // Food Item
    struct FoodItem {
        string name;
        uint price;
    }
}
