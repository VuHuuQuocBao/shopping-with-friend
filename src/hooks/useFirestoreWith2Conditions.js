// import React, { useState } from "react";
// import { db } from "../firebase/config";

// const useFirestore = (collection, condition1, condition2) => {
//   const [documents, setDocuments] = useState([]);

//   React.useEffect(() => {
//     let collectionRef = db.collection(collection).orderBy("createdAt");
//     if (condition) {
//       if (!condition.compareValue || !condition.compareValue.length) {
//         // reset documents data
//         setDocuments([]);
//         return;
//       }

//       collectionRef = collectionRef.where(
//         condition1.fieldName,
//         condition1.operator,
//         condition1.compareValue
//       );
//       collectionRef = collectionRef.where(
//         condition2.fieldName,
//         condition2.operator,
//         condition2.compareValue
//       );
//     }

//     const unsubscribe = collectionRef.onSnapshot((snapshot) => {
//       const documents = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       setDocuments(documents);
//     });

//     return unsubscribe;
//   }, [collection, condition]);

//   return documents;
// };

// export default useFirestore;
