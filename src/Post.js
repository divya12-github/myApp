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
import useFirestorepost from './useFirestorepost';
import Pagination from '@material-ui/lab/Pagination';

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


    function Post(){
      const{postdata}=useFirestorepost('feed');
      var [docp,setDocp]=   useState([]);
      var [count,setCount] = React.useState(1);
      const [page, setPage] = React.useState();
      var [divvalue,setdivvalue] = React.useState(1);
      console.log(postdata);
 var btnvalue=1;
 var j = 1;
 const divvalueChange=(j)=>{
  setdivvalue(divvalue+1)

  
 }
 console.log(divvalue)
 const paginationclick=(event,value)=>{
  
    setPage(value);
    
   var db=firebase.firestore();
   var first = db.collection("feed")
        .orderBy("time","desc")
        .limit(count==1?count+4:count+4);

return first.get().then(function (documentSnapshots) {
  // Get the last visible document
  var documents = [];
  documentSnapshots.forEach(docp => {
    documents.push({...docp.data()});
   });
  var lastVisible = documents[documents.length-1];
  console.log("last", lastVisible);

  // Construct a new query starting at this document,
  // get the next 25 cities.
  var next = db.collection("feed")
          .orderBy("time","desc")
          .startAfter(lastVisible)
          .limit(5);
setDocp(documents)
setCount(count+4)
  console.log(next)
});
 }



      const deleteClicked = (e)=>{
        var a=e.currentTarget.id;
        console.log(a)
      var db=firebase.firestore();
      var dbase = db.collection("feed").orderBy("time","desc");
      dbase.get().then(function(querySnapshot) {
        var documents = [];
        querySnapshot.forEach(function(doc) {
          
            console.log(doc.id, " => ", doc.data());
            documents.push(doc.id);
            console.log(documents[a-1])
        });
     
         
        db.collection("feed").doc(`${documents[a-1]}`).delete().then(function() {
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
        <Link to="/Postcontainer" style={{backgroundColor:"transparent"}}>
            <Fab color="primary" aria-label="add" style={{position:"fixed",left:"80%"}}>
            <AddIcon style={{fontSize:"25px"}}/>
            </Fab>
          </Link>
          </div>
          {docp && docp.map(docp => (
            <div className="data-wrap" value={index++} label={divvalue} key={docp.id}style={{textAlign:"center"}} >
              <div><img src={docp.image} width={"60%"} height={"120px"} /></div>

              <p style={{fontSize:"11px"}}><b>{docp.imagetitle}</b><b>lat:{docp.latitude},</b><b>long:{docp.longitude}</b></p>
             <div style={{textAlign:"left",paddingLeft:"20px"}}>
               <Link to={{pathname:"/Editpost",
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
         
          <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} value={btnvalue} onChange={paginationclick} onClick={divvalueChange} />
    </div>
        </div>
        </Container>
        </div>
        </React.Fragment>
  )
    }





    export default Post;