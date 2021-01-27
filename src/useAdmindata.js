import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';



function useAdmindata(collection){
  var [admindata, setAdmindata] = useState([]);
  
  console.log(admindata);

  useEffect(()=>{
    var db=firebase.firestore();
    var dbase = db.collection("admins").orderBy("time","asc");
    dbase.get().then(snap => {
    var documents = [];
       snap.forEach(admindata => {
         documents.push({...admindata.data()});
        });
  
        setAdmindata(documents);
    
     
  })
},[collection]);
 return { admindata };
 }
    
    
    



export default useAdmindata;