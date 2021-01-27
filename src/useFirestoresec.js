import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import useFirestore from './useFirestore.js'






function useFirestoresec(collection){
  const [doct, setDoct] = useState([]);

  const {docs} = useFirestore('collection');
    console.log(docs);
   


   var dos=[];
   dos= docs.map(docs => (
         dos = docs.tag
         ))
    
    console.log(dos[2])


    
  useEffect(() => {
  
  
    const unsub = firebase.firestore().collection("leaders")
      .onSnapshot(snap => {
        const documents = [];
        snap.forEach(doct => {
          documents.push({...doct.data()});
        });
        setDoct(documents);
      });
     
    return () => unsub();
   
 
  }, [collection])
  
  return { doct };
}

export default useFirestoresec;