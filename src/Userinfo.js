import React, { Component,useState  } from 'react';
import * as firebase from 'firebase';
import './style.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useUserdata from './useUserdata.js';
import {fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 100,
      
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

function Userinfo(){
    const{userdata}=useUserdata('users');
    const[serchval,setSearchval]=useState("");
    console.log(userdata);
    const classes = useStyles();
var index=0;
const inputChange=(e)=>{
  setSearchval(e.target.value)
console.log(serchval);
var input, filter, ul, li, a, i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
ul = document.getElementById("myUL");
li = ul.getElementsByTagName("li");
for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
}


}
const blockingUser=(e)=>{
  var a=e.currentTarget.id;
      console.log(a)
     
      var db=firebase.firestore();
      var dbase = db.collection("users")
      console.log(dbase)
      dbase.get().then(function(querySnapshot) {
        var documents = [];
        querySnapshot.forEach(function(doc) {
          
            console.log(doc.id, " => ", doc.data().isblocked);
            documents.push(doc.id);
            console.log(documents[a])
            
        });
        db.collection("users").doc(`${documents[a]}`).update({
          isblocked:true
        })
      });
}

const inputValue=()=>{
  {/*
  firebase.firestore().collection("users").add({
    displaynamesearch:serchval
  })
  */}
}
 var usercount=0;
    return(
        <div>
        <CssBaseline />
        <Container maxWidth="sm" style={{boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase  classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              style={{border:"1px solid black"}} type="text" id="myInput" onKeyUp={inputChange} 
              onChange={inputValue}
              placeholder="Search..." title="Type in a name"/>
           
          </div>
        <div component="div" style={{ backgroundColor: 'transparent',paddingBottom:"5px", height: "auto" }} >
        <ul id="myUL">

        {userdata && userdata.map(userdata => (
          
            <div className="data-wrap"  key={userdata.id}style={{textAlign:"left",padding:"10px",width:"96%",wordWrap:"break-word"}} >
              <div style={{textAlign:"center"}}>
              <AccountCircleIcon color="primary" style={{fontSize:"55px"}} />
              </div>
              <Button variant="contained" color="primary" id={index++} onClick={blockingUser}  style={{marginLeft:"10px"}}>
                Block This User 
              </Button>
                    
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Displayname <b> {userdata.displayname}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Displaynamesearch <b>{userdata.displaynamesearch[0]},{userdata.displaynamesearch[1]},{userdata.displaynamesearch[2]},{userdata.displaynamesearch[3]},{userdata.displaynamesearch[4]},{userdata.displaynamesearch[5]}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Following count <b> {userdata.following_count}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Id <b> {userdata.id}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Idsearch <b> {userdata.idsearch[0]},{userdata.idsearch[1]},{userdata.idsearch[2]},{userdata.idsearch[3]},{userdata.idsearch[4]},{userdata.idsearch[5]}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Isblocked <b>{userdata.isblocked}</b>
              <Fab  size="small"  aria-label="edit" style={{width:"30px",height:"20px",marginTop:"-10px",background:"white",boxShadow:"none", float:"right"}}>
                    <EditIcon color="primary" />
                  </Fab> </a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Lastseen <b>Seconds {userdata.lastseen.seconds},Nanoseconds{ userdata.lastseen.nanoseconds}</b></a></li>

              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Latitude <b>{userdata.latitude}</b> ,Logitude <b>{ userdata.longitude}</b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Platform <b>{userdata.platform} </b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Rank <b>{userdata.rank} </b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Score <b>{userdata.score} </b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Search <b>{userdata.search[0]},{userdata.search[1]},{userdata.search[2]}
              {userdata.search[3]},{userdata.search[4]},{userdata.search[5]},{userdata.search[6]},{userdata.search[7]},{userdata.search[8]} </b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Signeduptime seconds:<b>{userdata.signeduptime.seconds}</b>, nanoseconds:<b>{ userdata.signeduptime.nanoseconds} </b></a></li>
              <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}> Signuploction <b>Accuracy:{userdata.signuploction.accuracy}, Altitude:{ userdata.signuploction.altitude},
              Heading: { userdata.signuploction.heading}, Latitude:{ userdata.signuploction.latitude},Longitude:{ userdata.signuploction.longitude}, 
               Mocked:{ userdata.signuploction.mocked}, Speed:{ userdata.signuploction.speed}, Speed Accuracy:{ userdata.signuploction.speedAccuracy}, Timestamp:{ userdata.signuploction.timestamp}
               </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Signupno <b>{userdata.signupno} </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Status <b>{userdata.status} </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Token <b>{userdata.token} </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Uid <b>{userdata.uid} </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Uidsearch <b>{userdata.uidsearch} </b></a></li>
               <li style={{fontSize:"11px", listStyleType: "none"}}><a href="#" style={{textDecoration:"none"}}>Var <b>{userdata.var} </b></a></li>

             
            </div>
          ))} 
          </ul>
          </div>
          </Container>
          </div>
    )
}



export default Userinfo;