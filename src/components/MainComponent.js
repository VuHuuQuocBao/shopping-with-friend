import React from "react";
import Header from "./Header";
import Main from "./Main";
import Basket from "./Basket";
import { addDocument } from "../firebase/services";
import { AppContext } from "../context/AppProvider";
import { nanoid } from "nanoid";
import firebase from "../firebase/config";
export default function MainComponent(props) {
  const { userId, setUserId } = React.useContext(AppContext);

  const { products, allItems, onAdd, onRemove } = props;
  console.log(userId);
  const handleOnLogin = () => {
    var newGeneratedID = nanoid();

    window.alert(newGeneratedID);
    addDocument("user", {
      userId: newGeneratedID,
    });
    setUserId(newGeneratedID);
    addDocument("cart", {
      userId: newGeneratedID,
      items: [],
    });
  };

  const handleGenerateCode = () => {
    var code = Math.random() * 1000;
    code = Math.ceil(code);
    code = code.toString();
    window.alert(code);
    addDocument("link", {
      code: code,
      userId: userId,
    });
  };

  return (
    <div>
      <Header countallItems={allItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket allItems={allItems} onAdd={onAdd} onRemove={onRemove}></Basket>
      </div>
      <button onClick={handleOnLogin}>PLEASE LOGIN HERE!</button>
      <button onClick={handleGenerateCode}>GENERATE RANDOM INVITE CODE</button>
    </div>
  );
}
