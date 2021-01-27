import React , { useState, useEffect } from 'react';
import * as firebase from 'firebase';



function useFirestorenews(collection){
  var [newsdata, setNewsdata] = useState([]);
  var latcount=22.3458;
  var lngcount=82.69633;
  console.log(newsdata);

  useEffect(()=>{
    var db=firebase.firestore();
    var dbase = db.collection("news").orderBy("time","desc");
    dbase.get().then(snap => {
    var documents = [];
       snap.forEach(newsdata => {
         documents.push({...newsdata.data(),lat: latcount++, lng:lngcount++});
        });
  
        setNewsdata(documents);
    
     
  })
},[]);
 return { newsdata };
 }
    
    



export default useFirestorenews;