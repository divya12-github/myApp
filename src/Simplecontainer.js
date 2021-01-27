import React, { useEffect,useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';

import Pagination from '@material-ui/lab/Pagination';
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import { array } from 'prop-types';
import * as firebase from 'firebase';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

 function Simplecontainer() {
  const [page, setPage] = React.useState(1);
  var [count,setCount] = React.useState(1);
  var [docp,setDocp]=   useState([]);
 var [dltvalue,setDltvalue]=React.useState(0);

  const handleChange = (event, value) => {
    setPage(value);
   
  };

  
  

  
 const clicked = (e)=>{

  var db=firebase.firestore();
  var dbase = db.collection("task").orderBy("time","desc");
  dbase.limit(count==1?count+9:count+9).get().then(snap => {
    
  var documents = [];
     snap.forEach(docp => {
       documents.push({...docp.data()});
      });
   
   var lastVisible = documents[documents.length-1];
   console.log("last", lastVisible);
   db.collection("task").orderBy("time","desc").startAfter(lastVisible).limit(count);
   setDocp(documents);
   setCount(count+9)
          })
        };


  const deleteClicked = (e)=>{
    var a=e.currentTarget.id;
    console.log(a)
  var db=firebase.firestore();
  var dbase = db.collection("task").orderBy("time","desc");
  dbase.get().then(function(querySnapshot) {
    var documents = [];
    querySnapshot.forEach(function(doc) {
      
        console.log(doc.id, " => ", doc.data());
        documents.push(doc.id);
        console.log(documents[a-1])
    });
 
     
    db.collection("task").doc(`${documents[a-1]}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
});

});
  }


  var index=0;
const classes = useStyles();
  return (
    <React.Fragment>
     <div>
      <CssBaseline />
      <Container maxWidth="sm" style={{boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
        <div component="div" style={{ backgroundColor: 'transparent',paddingBottom:"5px", height: "auto" }} >
        <div className={classes.root}>
        <Link to="/Taskcontainer" style={{backgroundColor:"transparent"}}>
            <Fab color="primary" aria-label="add" style={{position:"fixed",left:"70%"}}>
            <AddIcon style={{fontSize:"25px"}}/>
            </Fab>
          </Link>
          </div>
        

          {docp && docp.map(docp => (
            <div className="data-wrap" value={index++}  key={docp.id}style={{textAlign:"center"}} >
              <p style={{fontSize:"11px"}}><b>{docp.Title}</b></p>
             <div style={{textAlign:"left",paddingLeft:"20px"}}>
               <Link to={{pathname:"/Edittask",
               aboutPropsName:[index]}}>
                  <Button value={index+1} variant="contained"  color="primary"  className={classes.button} endIcon={<EditIcon />}>
                      Edit
                  </Button>
               </Link>
            
              <Button id={index} variant="contained" color="secondary" className={classes.button} onClick={deleteClicked} startIcon={<DeleteIcon />}>
              Delete  {index}
            </Button>
          
             </div>
              
            </div>
          ))} 
          {/*
          <div className='App'>
      <InfiniteList state={state} setState={setState}/>
    </div>
  */}
         <div className={classes.root} style={{textAlign:"center"}}>
         <Button color="primary" variant="contained" page={page} onClick={clicked}  onChange={handleChange}>
         click ME!!
           </Button>
         </div>
        </div>
        

      </Container>
      </div>
      
    </React.Fragment>
  );
}
export default Simplecontainer;