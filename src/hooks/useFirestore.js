import React, { useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection, condition) => {
  // tai sao dung useState khi co the dung bien var ??
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);
  console.log("GIA TRI CUA DOCUMENT LA: " + documents);
  return documents;
};

export default useFirestore;
