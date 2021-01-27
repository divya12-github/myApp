import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useFirestore from './useFirestore.js'
import useFirestoresec from './useFirestoresec';
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import './style.css';
import { deepOrange } from '@material-ui/core/colors';
import Upload from './Upload.js';
import SimpleModal from './SimpleModal.js'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import * as firebase from 'firebase';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
   
  };
  index++
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1

  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  var [value, setValue] = React.useState(0);
  var [count, setCount] = React.useState(0,2);
  const [dos, setDos] = React.useState([0]);
  var [UploadData, setUploadData] = React.useState([0]);
  var [Uploadfacebook, setUploadfacebook] = React.useState([0]);
  var [Uploadtwitter, setUploadtwitter] = React.useState([0]);
  var [Uploadyoutube, setUploadyoutube] = React.useState([0]);
  var label;
  const {docs} = useFirestore('collection');
  console.log(docs);
  const {doct} = useFirestoresec('leaders');
  console.log(doct);
  const { children, index, ...other } = props;
  
const dataChange = e => {
  setCount(e.target.value)
  console.log(count)
}




  
    const dataClick=()=>{
      


      UploadData=doct.map(doct=>(
        UploadData=(doct.name)

       ));
     
       setUploadData(UploadData[count]);
       console.log(UploadData[count]);
    

       Uploadfacebook =doct.map(doct=>(
        Uploadfacebook=(doct.facebook_page)
       ));
       setUploadfacebook(Uploadfacebook[count]);
       console.log(Uploadfacebook[count]);
    
       Uploadtwitter =doct.map(doct=>(
        Uploadtwitter=(doct.twitter_username)
       ));
       setUploadtwitter(Uploadtwitter[count]);
       console.log(Uploadtwitter[count]);
    
       Uploadyoutube =doct.map(doct=>(
        Uploadyoutube=(doct.youtube_channel)
       ));
       setUploadyoutube(Uploadyoutube[count]);
       console.log(Uploadyoutube[count]);

       console.log("data div clicked");
       console.log(count)
        
    
    }
  
    const pass=(event,dos)=>{
      dos= docs.map(docs => (
        dos = docs.tag
        
      ))
      setDos(dos[value]);
      console.log(dos[value]);
     
       
       console.log("button clicked");
        
    
    }
    

const handleClick=(event,dos)=>{
  dos= docs.map(docs => (
    dos = docs.tag
    ))
  setDos(dos[value]);
  console.log(dos[value]);
  console.log("div clicked");
  }
 const handleChange = (event, newValue) => {
    setValue(newValue);
  
   
   
    };
 const deletedata=(e)=>{
   console.log("delete clicked")
   var a=e.currentTarget.id;
        console.log(a)
      var db=firebase.firestore();
      var dbase = db.collection("leaders");
      dbase.get().then(function(querySnapshot) {
        var documents = [];
        querySnapshot.forEach(function(doc) {
          
            console.log(doc.id, " => ", doc.data());
            documents.push(doc.id);
            console.log(documents[a-1])
        });
     
         
        db.collection("leaders").doc(`${documents[a-1]}`).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
    });
 }
  return (
  <div className={classes.root}>
        <AppBar position="static">
        <p style={{textAlign:"center" ,fontSize:"15px"}}><b>Collection</b></p>
         <Tabs value={value} onChange={handleChange}   aria-label="simple tabs example">
           {docs && docs.map((docs,index) => (
            <Tab label={docs.name}  onClick={handleClick} {...a11yProps(0)}  key={docs.index} icon={<img src={docs.image} style={{borderRadius: "50%",width:"65px",height:"65px"}} />}    /> 
            
          
             ))}
            

           <div style={{textAlign:"center",marginLeft:"10px"}}>
                <Link to ="/Upload"> 
                    <button class="ui button" id="lastbtn" style={{marginLeft:"300px"}} >
                        <h4 style={{ textAlign:"center"}}><b>Add New</b></h4>
                    </button>
                </Link>
             </div>  
            
            </Tabs>

            
        </AppBar>
           <p style={{textAlign:"center",visibility:"hidden"}}>tag={dos}</p> 
    <TabPanel value={value}  index={value} > 
         <div style={{paddingTop:"-10px"}}>
            <tr>
             {doct && doct.map((doct,count) => (
               <td >
                <Grid container spacing={2}>
             <Grid item style={{width:"150px"}}   value={dos} index={doct.tag} hidden={(dos !== doct.tag)}>
<Paper className={classes.paper} value={count} onClick={dataChange} className="img-wrap"     key={doct.image} style={{textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>
                <img src={doct.image} style={{borderRadius: "50%",width:"65px",height:"65px"}} />
                <p style={{fontSize:"11px"}}><b>{doct.name}</b></p>
                <p style={{fontSize:"11px" ,marginTop:"-10px"}}><b>{doct.tag}</b></p>
                <p style={{marginTop:"-7px"}}>
                  <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" value="Edit"  type="button" data-toggle="dropdown"
                    style={{width:"65%",height:"25px",padding:"5px",fontSize:"11px"}} 
                    
                    onClick={dataClick}
                   ><b>Edit</b>
                    </button>
                    <ul class="dropdown-menu" style={{textAlign:"center"}}>
                      {/*
                      <Link to={{pathname:"/Uploadedit",
                     aboutPropsName:[UploadData],
                     aboutPropsFacebook:[Uploadfacebook],
                     aboutPropsYoutube:[Uploadyoutube],
                     aboutPropsTwitter:[Uploadtwitter]
                     }}>       
                            
                  <button type="button" class="btn btn-default" id="modelbtn"  >Update</button>
                        
                        
                        </Link>   
                        */}
                        <SimpleModal  aboutPropsName={count+1} />
                      <button type="button" id={count+1} class="btn btn-default" onClick={deletedata} >Delete{index}</button>
                        
                        
                    </ul>
                  </div>
                </p>
               
              <p>count:{count}</p> 
                </Paper>
              </Grid>
              </Grid>
              </td>
             ))}
             
            <td class="col1" >
                <Grid style={{textAlign:"center"}}>
                <Grid item xs={9}>
                
                  <Link to={{pathname:"/Uploadsecond" , 
                    aboutProps:[dos]}}> 
                    <button class="ui button" id="lastbtn" style={{marginTop:"1px"}} 
                    onClick={pass}  dos={dos[value]} >
                        <h4 style={{ textAlign:"center"}}><b>Add New</b></h4>
                    </button>
                </Link>
                
                </Grid>
                </Grid>
             </td>
           </tr>
        
        </div>
                    <p style={{textAlign:"center",marginTop:"20px"}}><b></b></p> 
                     
        </TabPanel>
        <div>
      
        
        </div>
     
  

      </div>
  );
}
