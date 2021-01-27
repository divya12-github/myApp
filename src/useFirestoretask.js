import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';



function useFirestoretask(collection){
  var [docp, setDocp] = useState([]);
  var latcount=22.3458;
  var lngcount=82.69633;
  console.log(docp);

  useEffect(()=>{
    var db=firebase.firestore();
    var dbase = db.collection("task").orderBy("time","desc");
    dbase.get().then(snap => {
    var documents = [];
       snap.forEach(docp => {
         documents.push({...docp.data(),lat: latcount++, lng:lngcount++});
        });
  
     setDocp(documents);
    console.log(documents)
     
  })
},[]);
 return { docp };
 }
    
    



export default useFirestoretask;