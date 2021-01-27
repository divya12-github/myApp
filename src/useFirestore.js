import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';


function useFirestore(collection){
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firebase.firestore().collection("collection")
      .onSnapshot(snap => {
        const documents = [];
        snap.forEach(docs => {
          documents.push({...docs.data()});
        });
        setDocs(documents);
      });

    return () => unsub();
   
  }, [collection]);

  return { docs };
}

export default useFirestore;