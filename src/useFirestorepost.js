import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';



function useFirestorepost(collection){
  var [postdata, setPostdata] = useState([]);
  var latcount=22.3458;
  var lngcount=82.69633;
  console.log(postdata);

  useEffect(()=>{
    var db=firebase.firestore();
    var dbase = db.collection("feed").orderBy("time","desc");
    dbase.get().then(snap => {
    var documents = [];
       snap.forEach(postdata => {
         documents.push({...postdata.data(),lat: latcount++, lng:lngcount++});
        });
  
        setPostdata(documents);
    
     
  })
},[]);
 return { postdata };
 }
    
    



export default useFirestorepost;