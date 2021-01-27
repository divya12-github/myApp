import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';



function useUserdata(collection){
  var [userdata, setUserdata] = useState([]);
  
  console.log(userdata);

  useEffect(()=>{
    var db=firebase.firestore();
    var dbase = db.collection("users").limit(10)
    dbase.get().then(snap => {
    var documents = [];
       snap.forEach(userdata => {
         documents.push({...userdata.data()});
        });
  
        setUserdata(documents);
    
     
  })
},[collection]);
 return { userdata };
 }
    
    
    



export default useUserdata;