import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import { useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  Router,
} from "react-router-dom";
import MainComponent from "./components/MainComponent";
import InviteComponent from "./components/InviteComponent";
import { AppContext } from "./context/AppProvider";
// import { async } from "@firebase/util";
import useFirestore from "./hooks/useFirestore";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config";
import firebase from "./firebase/config";
import { verifyBeforeUpdateEmail } from "firebase/auth";
function App() {
  const { userId, setUserId, cart } = React.useContext(AppContext);
  const { products } = data;
  const [allItems, setallItems] = useState([]);

  // React.useEffect(() => {
  //   // Update the document title using the browser API
  //   setallItems(cart[0].items)
  // },[cart]);
  var testTestTest = [];
  // const cartCondition = React.useMemo(() => {
  //   return {
  //     fieldName: "userId",
  //     operator: "==",
  //     compareValue: userId,
  //   };
  // }, [userId]);
  // // render lan' dau items trong cart la rong~
  // const cart = useFirestore("cart", cartCondition);
  console.log("cart: " + JSON.stringify(cart));

  if (userId && cart[0]) {
    testTestTest = cart[0].items;
    if (testTestTest === undefined) {
      testTestTest = [];
    }

    // const testTestTest = cart[0].items;
    // if (testTestTest === undefined) {
    //   testTestTest = [];
  }
  async function onAdd(product) {
    var allItemsTemp = cart[0].items;
    if (allItemsTemp === undefined) {
      allItemsTemp = [];
    }
    console.log("ALLITEMSTEMP: " + JSON.stringify(allItemsTemp));
    const exist = allItemsTemp.find((x) => x.id === product.id);
    if (exist) {
      allItemsTemp = allItemsTemp.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      console.log(
        "ALLITEMSTEMP SAU KHI UPDATE: " + JSON.stringify(allItemsTemp)
      );
      // const cartRef = db.collection("cart").doc(cart[0].id);
      // const randomNumber = Math.random() * 100;
      // cartRef.update({
      //   items: [randomNumber],
      // });

      // co' update trong firebase nhung snapshot ko take effect
      await setDoc(doc(db, "cart", cart[0].id), {
        userId: userId,
        items: allItemsTemp,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      setallItems([...allItemsTemp, { ...product, qty: 1 }]);
      allItemsTemp.push({ ...product, qty: 1 });
      console.log(
        "ALLITEMSTEMP SAU KHI UPDATE: " + JSON.stringify(allItemsTemp)
      );
      await setDoc(doc(db, "cart", cart[0].id), {
        userId: userId,
        items: allItemsTemp,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setallItems(allItemsTemp);

    // update the cart (but we need the id how to find the id of document)
    // use fireStore return a document and contains the id of that document in snapshot function
  }
  const onRemove = (product) => {
    const exist = allItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setallItems(allItems.filter((x) => x.id !== product.id));
    } else {
      setallItems(
        allItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/mainPage"
          element={
            <MainComponent
              products={products}
              allItems={testTestTest}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          }
        />

        <Route element={<InviteComponent />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
