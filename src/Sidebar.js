import React, { Component,useState  } from 'react';
import * as firebase from 'firebase';
import './style.css';
import User from './User.js';
import Emailauth from './Emailauth.js';
import Validationform from './Validationform.js';
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import Upload from './Upload.js';
import useFirestore from './useFirestore.js'
import useFirestoresec from './useFirestoresec';
import useAdmindata from './useAdmindata.js';
import Userinfo from './Userinfo'
import SimpleTabs from './Demo.js';
import Uploadedit from './Uploadedit.js'
import Simplecontainer from './Simplecontainer';
import Googlemap from './Googlemap.js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Register from './Register'
import Managenews from './Managenews';
import Post from './Post'
import Googlemappost from './Googlemappost';
import Googlemapnews from './Googlemapnews';
import Notification from './Notification';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 580,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));


const  Sidebar = (props) => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const {docs} = useFirestore('collection');
    console.log(docs);
    const {doct} = useFirestoresec('leaders');
    const [toggle, setToggle] = useState(true);
    const [tasktoggle, setTasktoggle] = useState(true);
    const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const{admindata}=useAdmindata('admins');
  console.log(admindata);
 
  var pagevalue= admindata.map(admindata=>(
    pagevalue=admindata.pages
    ))
    var htmlFor=[pagevalue[pagevalue.length-1]];
    var label1=["user"];
    var label2=["post"];
    var label3=["social_umbrella"];
    var label4=["news"];
    var label5=["task"];
    console.log(pagevalue[pagevalue.length-1]);
    console.log(htmlFor[0])
   
    console.log(`${htmlFor[0]}`.includes("news"))
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const toggleChecked = () => {
      setToggle(toggle => !toggle);
      setTasktoggle( {tasktoggle : toggle});
    };
    const tasktoggleChecked = (e) =>{
      setToggle(toggle => !toggle);
      setTasktoggle( tasktoggle => !tasktoggle);
   
     
     
    }
   

   

    const handleChangee = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          firebase.storage()
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              console.log(url)
            });
        }
      );
    };
  
    console.log("image: ", image);
   
   
        return (
        <div >
          <div style={{background:"#fff",padding:"2px",position:"relative"}}>
          <div class="first"style={{background:"#fff", padding:"5px"}}>
            <h3 style={{textAlign:"center",backgroundColor:"#E8E8E8",padding:"3px" ,boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"}}>Dashboard</h3></div>
          </div>
          <div style={{marginLeft:"25%", padding:"7px"}}>
          <div  style={{marginTop:"50px"}}>
            {/*

 <button class="ui button" id="uibtn" >ADD</button>
 <button class="ui button" id="uibtn">VIEW</button>
 <button class="ui button" id="uibtn">EDIT</button>

 */}
  </div>
</div>
          <div className={classes.root} style={{marginTop:"-20px"}}>
          <div class="main" style={{width:"25%" ,position:"relative"}}>
          <h4 style={{marginTop:"5px"}}><b>Analytics</b></h4>
          <h4 style={{position:"absolute",top:"39%",left:"34%"}}><b>Managers</b></h4>
          <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        
         
      {/*  <Tab label="News" {...a11yProps(0)} style={{background:"white"}} />*/}
      <Tab label="Heat map post"  hidden={(`${htmlFor[0]}`.includes("heatmapPOST")) != (true)} {...a11yProps(0)} style={{background:"white" , marginTop:"5px",borderRadius:"3px"}} />
      <Tab label="Heat map news"  hidden={(`${htmlFor[0]}`.includes("heatmapNEWS")) != (true)} {...a11yProps(1)} style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
       
      <Tab label="User"  hidden={(`${htmlFor[0]}`.includes("user")) != (true)} {...a11yProps(2)} style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="Posts" hidden={(`${htmlFor[0]}`.includes("post")) != (true) }  {...a11yProps(3)} style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
      
        
        <Tab label="Social Umbrella" hidden={(`${htmlFor[0]}`.includes("social_umbrella")) != (true)} {...a11yProps(4)} style={{background:"white" , marginTop:"47px",borderRadius:"3px"}} />
        <Tab label="News" {...a11yProps(5)} hidden={(`${htmlFor[0]}`.includes("news")) != (true) } style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="Task" {...a11yProps(6)} hidden={(`${htmlFor[0]}`.includes("task")) != (true)  } style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="New Enter" {...a11yProps(7)} style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="Register" {...a11yProps(8)}style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="Userinfo" {...a11yProps(9)}style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
        <Tab label="Notification" {...a11yProps(10)}style={{background:"white" , marginTop:"10px",borderRadius:"3px"}} />
      </Tabs>
     </div>
    {/* <TabPanel id="tabs" value={value} index={0}>
     

      </TabPanel>*/}  
      <TabPanel  id="tabs" value={value} index={0}>
      <Googlemappost />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={1}>
      <Googlemapnews />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={2}>
      <Googlemap />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={3}>
        <Post /> 
      </TabPanel>
      
      <TabPanel  id="tabs" value={value} index={4}>
      <SimpleTabs />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={5}>
      <Managenews />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={6}>
      <Simplecontainer/> 
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={7}>
        <Validationform />
       </TabPanel>
      <TabPanel  id="tabs" value={value} index={8}>
        <Register />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={9}>
        <Userinfo />
      </TabPanel>
      <TabPanel  id="tabs" value={value} index={10}>
        <Notification />
      </TabPanel>
 

{/*

            
          <ul className="unorder" >
          
        <li>
          <div class="main">
          <h4><b>Analytics</b></h4>
            <div class="menu">
           
            <button class="fluid ui button" id="menubtn">User</button>
          
            </div>
          </div> 
        </li>
        <li style={{marginTop:"8px"}}>
          <div class="main">
           <h4><b>Managers</b></h4>
            <div class="menu">
            <button class="fluid ui button" id="menubtn" onClick={toggleChecked}>Social Umbrella</button>
            <button class="fluid ui button" id="menubtn">News </button>
            
            <button class="fluid ui button" id="menubtn" name="btnSearch" onClick={tasktoggleChecked} >Task</button>
            
            </div>
          </div> 
        </li>
        <li style={{marginTop:"8px"}}>
          <div class="main" style={{padding:"0px"}}>
            <div class="menu">
              <Link to="/Validationform" style={{backgroundColor:"transparent"}}>
            <button class="fluid ui button" id ="menubtn" style={{margin:"0px",width:"100%"}}>New Enter</button>
            </Link>
            </div>
          </div> 
        </li>
        <li style={{marginTop:"8px"}}>
          <div class="main" style={{padding:"0px"}}>
            <div class="menu">
              <Link to="/Register" style={{backgroundColor:"transparent"}}>
            <button class="fluid ui button" id ="menubtn" style={{margin:"0px",width:"100%"}}>Register</button>
            </Link>
            </div>
          </div> 
          
        </li>
  

  
</ul>
*/}
</div>



{/*

<div style={{backgroundColor:"#d2d0cd", marginTop:"1%",paddingTop: "13px" ,paddingBottom:"13px"}}>
  <p style={{textAlign:"center" ,fontSize:"15px"}}><b>Collection</b></p>
  <div style={{marginTop:"-20px"}}>
  <tr width="100%">
    
    {docs && docs.map(docs => (
      <td class="col1">
        <div className="img-wrap" key={docs.image} style={{textAlign:"center"}} >
          <img src={docs.image} style={{borderRadius: "50%",width:"65px",height:"65px"}} />
           <p style={{fontSize:"11px"}}><b>{docs.name}</b></p>
           <p style={{fontSize:"11px" ,marginTop:"-10px"}}><b>{docs.tag}</b></p>
         </div>
        </td>
      ))}
  
    
     <td class="col1">
     <div style={{textAlign:"center"}}>
       
  
     <Link to ="/Upload"> 
        <button class="ui button" id="lastbtn">
            <h3 style={{ textAlign:"center"}}>Add New</h3>
        </button>
    </Link>
    </div>
     </td>
     </tr>
     </div>
  </div>
*/}
  {/*
  <div style={{marginLeft:"10%"}}>

      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />

      


      </div>
      <User />
  */}
      {/*
    
      <div style={{backgroundColor:"#d2d0cd", marginTop:"2%",paddingTop: "13px" ,paddingBottom:"13px"}}>
  
  <div style={{marginTop:"-20px"}}>
  <tr width="100%">
    
    {doct && doct.map((doct) => (
      <td class="col1">
        <div className="img-wrap" key={doct.image} style={{textAlign:"center"}}>
          <img src={doct.image} style={{borderRadius: "50%",width:"65px",height:"65px"}} />
           <p style={{fontSize:"11px"}}><b>{doct.name}</b></p>
           <p style={{fontSize:"11px" ,marginTop:"-10px"}}><b>{doct.tag}</b></p>
         </div>
        </td>
      ))}
  
    
     <td class="col1">
     <div style={{textAlign:"center"}}>
       
  
     <Link to ="/Uploadsecond"> 
        <button class="ui button" id="lastbtn" style={{marginTop:"30px"}}>
            <h3 style={{ textAlign:"center"}}>Add New</h3>
        </button>
    </Link>
    </div>
     </td>
     </tr>
     </div>
  </div>
    */}
 
{/*
<div style={{marginLeft:"26%" ,marginTop:"10px",marginRight:"15px"}}>
{toggle && <SimpleTabs /> }

{!tasktoggle && <Simplecontainer/> }
<Googlemap />

</div>
*/}
</div>
 );
      

}


export default Sidebar;