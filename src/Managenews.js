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
import * as firebase from 'firebase';
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import useFirestorenews from "./useFirestorenews"
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


    function Managenews(){
      const{newsdata}=useFirestorenews('news');
    console.log(newsdata);




    const deleteClicked = (e)=>{
      var a=e.currentTarget.id;
      console.log(a)
    var db=firebase.firestore();
    var dbase = db.collection("news").orderBy("time","desc");
    dbase.get().then(function(querySnapshot) {
      var documents = [];
      querySnapshot.forEach(function(doc) {
        
          console.log(doc.id, " => ", doc.data());
          documents.push(doc.id);
          console.log(documents[a-1])
      });
   
       
      db.collection("news").doc(`${documents[a-1]}`).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  
  });
    }

        const classes = useStyles();
        var index=0;
  return (
    <React.Fragment>
     <div>
      <CssBaseline />
      <Container maxWidth="sm" style={{boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
        <div component="div" style={{ backgroundColor: 'transparent',paddingBottom:"5px", height: "auto" }} >
        <div className={classes.root}>
        <Link to="/Newscontainer" style={{backgroundColor:"transparent"}}>
            <Fab color="primary" aria-label="add" style={{position:"fixed",left:"70%"}}>
            <AddIcon style={{fontSize:"25px"}}/>
            </Fab>
          </Link>
          </div>
          {newsdata && newsdata.map(newsdata => (
            <div className="data-wrap"  value={index++}  key={newsdata.id}style={{textAlign:"center"}} >
              <p style={{fontSize:"11px"}}><b>{newsdata.imagetitle}</b></p>
             <div style={{textAlign:"left",paddingLeft:"20px"}}>
               <Link to={{pathname:"/Editnews",
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
        </div>
        </Container>
        </div>
        </React.Fragment>
  )
    }





    export default Managenews;