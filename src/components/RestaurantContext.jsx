import React, { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  console.log("RestaurantProvider initialized with:", selectedRestaurant);
  const [cart, setCart] = useState([]);
  return (
    <RestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant, cart, setCart }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext); 