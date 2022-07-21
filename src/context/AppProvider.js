import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [userId, setUserId] = useState("");
  // const [cart, setCart] = useState([]);
  console.log("userID set lan dau la: " + userId);
  const cartCondition = React.useMemo(() => {
    return {
      fieldName: "userId",
      operator: "==",
      compareValue: userId,
    };
  }, [userId]);

  // render lan' dau items trong cart la rong~
  const cart = useFirestore("cart", cartCondition);
  // setCart(useFirestore("cart", cartCondition));
  console.log("cart: " + JSON.stringify(cart));
  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        cart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
