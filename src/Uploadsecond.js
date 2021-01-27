import React, { Component ,useState, useCallback, useRef, useEffect  } from 'react';
import * as firebase from 'firebase';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import useFirestore from './useFirestore.js'
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const pixelRatio = 4;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});



const Uploadsecond = (props)=> {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [facebook, setFacebook] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [progress, setProgress] = useState(0);
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%",  width: 30,
    height: 60});
    const [completedCrop, setCompletedCrop] = useState(null);
    const {docs} = useFirestore('collection');
    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);
    const [value, setValue] = React.useState(0);
    const [dos, setDos] = React.useState([0]);
    const classes = useStyles();
   
    console.log(props.location.aboutProps)
    
   
    const timeChange = e => {
      const newTime = new Date().toLocaleTimeString();
      setTime( newTime );
       };
 
    
    const handleChange = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const nameChange = e => {
     setName( e.target.value );
      };

      const handleClick=(event,dos)=>{
        dos= docs.map(docs => (
          dos = docs.tag
          
        ))
        setDos(dos[value]);
        console.log(dos[value]);
       
         
         console.log("div clicked");
          
      
      }
      const handlChange = (event, newValue) => {
        setValue(newValue);
        
    
      };
    const facebookChange = e => {
    setFacebook( e.target.value );
             };  
    const youtubeChange = e => {
    setYoutube( e.target.value );
                 };
    const twitterChange = e => {
    setTwitter( e.target.value );
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
           firebase.firestore().collection("leaders").add({
                    image:url,
                    name:name,
                     tag:`${props.location.aboutProps}`,
                     time: firebase.firestore.FieldValue.serverTimestamp(),
                     facebook_page:facebook,
                     twitter_username:twitter,
                     youtube_channel:youtube
                     

                 

                    
                   
                   
                })
               
                setUrl(url);
                console.log(url)
              })
            
            
        }
      );
    };
  
    console.log("image: ", url);
    console.log(tag);

    function getResizedCanvas(canvas, newWidth, newHeight) {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = newWidth;
        tmpCanvas.height = newHeight;
      
        const ctx = tmpCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          newWidth,
          newHeight
        );
      
        return tmpCanvas;
      }
      
      function generateDownload(previewCanvas, crop) {
        if (!crop || !previewCanvas) {
          return;
        }
      
        const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
      
        canvas.toBlob(
          blob => {
            const previewUrl = window.URL.createObjectURL(blob);
      
            const anchor = document.createElement("a");
            anchor.download = "cropPreview.png";
            anchor.href = URL.createObjectURL(blob);
            anchor.click();
      
            window.URL.revokeObjectURL(previewUrl);
          },
          "image/png",
          1
        );
      }
      




    const onSelectFile = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      };
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => setUpImg(reader.result));
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    
      const onLoad = useCallback(img => {
        imgRef.current = img;
      }, []);
    
      useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
          return;
        }
    
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
    
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
    
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }, [completedCrop]);

      
      
    
     {/*
       useEffect(() => {
        const unsub = firebase.firestore().collection("collection")
          .onSnapshot(snap => {
            const documents = [];
            snap.forEach(docs => {
              documents.push({...docs.data()});
            });
            setDocs(documents);
          });
    
        return () => unsub();
       
      }, [collection]);

    
    
      console.log(docs);
    
*/} 
    
    
  
  
  
  
      
    
        return(
            <div>
               <div style={{background:"#fff",padding:"2px"}}>
                 <div style={{backgroundColor:"#fff", padding:"7px",marginTop:"-5px"}}>
                 <h3 style={{textAlign:"center",backgroundColor:"#E8E8E8",padding:"3px" ,boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"}}>Dashboard</h3>
                   </div>
                   </div>
                   {/*
                 <ul class="unorder">
        <li>
          <div class="main">
          <h4><b>Analytics</b></h4>
            <div class="menu">
            <button class="fluid ui button" id="menubtn">News</button>
            <button class="fluid ui button" id="menubtn">Posts</button>
            </div>
          </div> 
        </li>
        <li style={{marginTop:"-10px"}}>
          <div class="main">
          <h4><b>Managers</b></h4>
            <div class="menu">
            <button class="fluid ui button" id="menubtn">Social Umbrella</button>
            <button class="fluid ui button" id="menubtn">News </button>
            <button class="fluid ui button" id="menubtn">Task</button>
            </div>
          </div> 
        </li>
        <li style={{marginTop:"-17px"}}>
          <div class="main" style={{padding:"0px"}}>
            <div class="menu">
              <Link to="/Validationform" style={{backgroundColor:"transparent"}}>
            <button class="fluid ui button" id ="menubtn" style={{margin:"0px",width:"102%"}}>New Enter</button>
            </Link>
            </div>
          </div> 
        </li>
        <li style={{marginTop:"-10px", marginBottom:"40px"}}>
          <div class="main" style={{padding:"0px"}}>
            <div class="menu">
              <Link to="/Home" style={{backgroundColor:"transparent"}}>
            <button class="fluid ui button" id ="menubtn" style={{margin:"0px",width:"102%"}}>Back</button>
            </Link>
            </div>
          </div> 
        </li>
  
  
</ul>
*/}
                <div style={{ padding:"7px"}}>
                 {/*
                    <div class="three ui buttons" style={{marginTop:"10px"}}>
                    <button class="ui button" id="uibtn">ADD</button>
                    <button class="ui button" id="uibtn">VIEW</button>
                    <button class="ui button" id="uibtn">EDIT</button>
                    </div>    
                    */}
                </div>
                <div style={{marginLeft:"30%", marginRight:"30%", padding:"20px",position:"absolute"}}>
                <Card className={classes.root}>
                <CardContent>
                <label for="myfile" style={{border:"1px solid rgb(232, 232, 232)",fontWeight:"300",width:"50%",textAlign:"center",height:"27px"}}>
                Change Image 
                <input  type="file" id="myfile" name="myfile" style={{color:"transparent",width:"0px",display:"none"}} onChange={onSelectFile} />
                </label>
                <div style={{marginRight:"5%"}}>
                       <ReactCrop src={upImg} onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={c => setCompletedCrop(c)} />
                         
                      </div>
                      
                    <div style={{backgroundColor:"#E8E8E8",padding:"10px",textAlign:"center",width:"85%"}}>
                   

                        <h5 style={{marginTop:"20px"}} ><b>Drag and Drop image here</b></h5>
                        <input type="file" id="myfile" name="myfile" onChange={onSelectFile}   style={{marginLeft:"15%",width:"80%",marginTop:"10px", paddingBottom:"20px", height: "90px" }} />
                    </div>
                   
                    <div style={{paddingBottom:"20px"}}> {/*
                         <canvas id="canvas" ref={previewCanvasRef} style={{width: completedCrop?.width ?? 0, height: completedCrop?.height ?? 0
                          }} />
                           */}
                      </div> 
                     
                    <input type="text" id="fname" name="name"  onChange={nameChange}  placeholder="Name"  />
                    <input type="text" id="fname" name="name" value={props.location.aboutProps} onChange={handlChange} onClick={handleClick}  placeholder="Tag" />
                    <input type="text" id="fname" name="name"   onChange={facebookChange}  placeholder="Facebook" />
                    <input type="text" id="fname" name="name"   onChange={youtubeChange}  placeholder="YouTube" />
                    <input type="text" id="fname" name="name"   onChange={twitterChange}  placeholder="Twitter" />
                    <input type="text" id="time" name="name" value={time}  onChange={timeChange}  placeholder="Tag" />
                   
                    <button class="fluid ui button" onClick={handleUpload } style={{width:"85%",color:"black" ,marginTop:"15%"}}>Post</button>
                    <p >{url}</p> 
                        
                           
                      
        </CardContent>
        </Card>
     
                </div>
                
                 
      
              
          
            </div>
        )
       
    
}

export default Uploadsecond;