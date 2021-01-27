import React, { Component ,useState, useCallback, useRef, useEffect  } from 'react';
import * as firebase from 'firebase';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import useFirestore from './useFirestore.js'
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Validationform from './Validationform';
import useForm from './useForm'
import validate from './Validate'


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



const Postcontainer = (props)=> {
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
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const {docs} = useFirestore('collection');
    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);
    const [value, setValue] = React.useState(0);
    const [dos, setDos] = React.useState([0]);
    const classes = useStyles();
   
    const [errors, setErrors] = useState({}) 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const initialValues = {
      image_title: "",
      short_description:"",
      link:"",
      phone:"",
      back_link:"",
      back_title:"",
      paragraph1:"",
      paragraph2:"",
      ps:""
       
    }
   
    const timeChange = e => {
      const newTime = new Date().toLocaleTimeString();
      setTime( newTime );
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
    const handleSubmit = (event) => {
        if (event) event.preventDefault()
        // Only validate if the validate function is used
        if (validate) {
            setErrors(validate(values))
        }
        setIsSubmitting(true)
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
           firebase.firestore().collection("feed").add({
                    image:url,
                    imagetitle:`${values.image_title}`,
                    shortdescription:`${values.short_description}`,
                    Link:`${values.link}`,
                    phone_no:`${values.phone}`,
                    back_link:`${values.back_link}`,
                    Title:`${values.back_title}`,
                    Paragraph1:`${values.paragraph1}`,
                    Paragraph2:`${values.paragraph2}`,
                    Ps:`${values.ps}`,
                    time: firebase.firestore.FieldValue.serverTimestamp()
                 

                    
                   
                   
                })
               
                setUrl(url);
                console.log(url)
              })
            
            
        }
      );
    };
  
    console.log("image: ", url);
    console.log(tag);
    const {values,handleChange}  = useForm(
        initialValues,
        login,
        validate,
        
    )
    function login() {
        console.log('No errors, submit callback called!')
    }
    
        
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
            <React.Fragment>
            <div>
             <CssBaseline />
             <Container maxWidth="sm" style={{boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
               <div component="div" style={{ backgroundColor: '#fff',marginBottom:"10px",paddingBottom:"10px" ,height:"auto",boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px" }} >
                   <div className={classes.root}>
                       <AppBar position="static" style={{padding:"5px" ,background:"#fff"}}>
                       <Toolbar style={{background:"#3f51b5",color:"#fff",minHeight:"40px",boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
                       <Link to="/Post"style={{color:"#fff"}}>
                       <ArrowBackIcon/>
                       </Link>
                       <Typography variant="h6" style={{textAlign:"center",marginLeft:"180px"}} className={classes.title}>
                           Add Cards
                       </Typography>
                       <Button color="inherit" onClick={handleSubmit} style={{marginLeft:"160px"}} >Post</Button>
                       </Toolbar>
                   </AppBar>
                   </div>
               <form onSubmit={handleSubmit } style={{marginLeft:"7%"}}>
               <div style={{marginTop:"20px"}}>
               <label for="myfile" style={{border:"1px solid rgb(232, 232, 232)",fontWeight:"300",width:"50%",textAlign:"center",height:"27px"}}>
                       Change Image 
                       <input  type="file" id="myfile" name="myfile" style={{color:"transparent",width:"0px",display:"none"}} onChange={onSelectFile} />
                       </label>
         <p>url:{url}</p>
                       <div style={{marginRight:"5%",position:"relative"}}>
                              <ReactCrop src={upImg} onImageLoaded={onLoad} style={{maxWidth:"30% !important"}}
                               crop={crop}
                               onChange={c => setCrop(c)}
                               onComplete={c => setCompletedCrop(c)} />
                                
                             </div>
                           <div style={{backgroundColor:"#E8E8E8",padding:"7px",textAlign:"center",width:"75%"}}>
                           <h5 style={{marginTop:"20px"}} ><b>Drag and Drop image here</b></h5>
                               <input type="file" id="myfile" name="myfile" onChange={onSelectFile} style={{marginLeft:"15%",width:"80%",marginTop:"20px", paddingBottom:"20px"}} />
                           </div>
                           <div>
                                <canvas id="canvas1" ref={previewCanvasRef} style={{width: completedCrop?.width ?? 0, height: completedCrop?.height ?? 0
                                 }} />
                             </div> 
                             </div> 
                             <div className="field">
                     
                       <div className="control">
                         <input id="fname"  style={{background:"transparent"}}   placeholder="Image Title" 
                           autoComplete="off"
                           className={`input ${errors.image_title &&
                             'is-danger'}`}
                           type="image_title"
                           name="image_title"
                           onChange={handleChange }
                           value={values.image_title}
                           required
                         />
                         {errors.image_title && (
                           <p className="help is-danger">
                             {errors.image_title}
                           </p>
                         )}
                       </div>
                     </div>
                           
                     <div className="field">
                     
                     <div className="control">
                       <input id="fname"  style={{background:"transparent"}}   placeholder="Short Description" 
                         autoComplete="off"
                         className={`input ${errors.short_description &&
                           'is-danger'}`}
                         type="short_description"
                         name="short_description"
                         onChange={handleChange }
                         value={values.short_description}
                         required
                       />
                       {errors.short_description && (
                         <p className="help is-danger">
                           {errors.short_description}
                         </p>
                       )}
                     </div>
                   </div>
                   <div className="field">
                     
                                   <div className="control">
                                     <input id="fname"  style={{background:"transparent"}}   placeholder="Phone" 
                                       autoComplete="off"
                                       className={`input ${errors.phone &&
                                         'is-danger'}`}
                                       type="phone"
                                       name="phone"
                                       onChange={handleChange }
                                       value={values.phone}
                                       required
                                     />
                                     {errors.phone && (
                                       <p className="help is-danger">
                                         {errors.phone}
                                       </p>
                                     )}
                                   </div>
                                 </div>       
                   <div className="field">
                     
                     <div className="control">
                       <input id="fname"  style={{background:"transparent"}}   placeholder="Link" 
                         autoComplete="off"
                         className={`input ${errors.link &&
                           'is-danger'}`}
                         type="link"
                         name="link"
                         onChange={handleChange }
                         value={values.link}
                         required
                       />
                       {errors.link && (
                         <p className="help is-danger">
                           {errors.link}
                         </p>
                       )}
                     </div>
                   </div>
                   <div style={{marginTop:"20px"}}><h5 style={{textAlign:"center"}}>Back</h5></div>
                   <div className="field">
                     
                                   <div className="control">
                                     <input id="fname"  style={{background:"transparent"}}   placeholder="News Page Link" 
                                       autoComplete="off"
                                       className={`input ${errors.back_link &&
                                         'is-danger'}`}
                                       type="back_link"
                                       name="back_link"
                                       onChange={handleChange }
                                       value={values.back_link}
                                       required
                                     />
                                     {errors.back_link && (
                                       <p className="help is-danger">
                                         {errors.back_link}
                                       </p>
                                     )}
                                   </div>
                                 </div>
                                 <div style={{marginTop:"20px"}}><h5 style={{textAlign:"center"}}>OR</h5></div>     
                                 <div className="field">
                     
                                   <div className="control">
                                       <input id="fname"  style={{background:"transparent"}}   placeholder=" Title" 
                                           autoComplete="off"
                                           className={`input ${errors.back_title &&
                                               'is-danger'}`}
                                           type="back_title"
                                           name="back_title"
                                           onChange={handleChange }
                                           value={values.back_title}
                                           required
                                       />
                                       {errors.back_title && (
                                           <p className="help is-danger">
                                               {errors.back_title}
                                           </p>
                                       )}
                                   </div>
                               </div>
                               <div className="field">
                     
                                   <div className="control">
                                       <input id="fname"  style={{background:"transparent"}}   placeholder="Paragraph 1" 
                                           autoComplete="off"
                                           className={`input ${errors.paragraph1 &&
                                               'is-danger'}`}
                                           type="paragraph1"
                                           name="paragraph1"
                                           onChange={handleChange }
                                           value={values.paragraph1}
                                           required
                                       />
                                       {errors.paragraph1 && (
                                           <p className="help is-danger">
                                               {errors.paragraph1}
                                           </p>
                                       )}
                                   </div>
                               </div>
                               <div className="field">
                     
                                   <div className="control">
                                       <input id="fname"  style={{background:"transparent"}}   placeholder="Paragraph 2" 
                                           autoComplete="off"
                                           className={`input ${errors.paragraph2 &&
                                               'is-danger'}`}
                                           type="paragraph2"
                                           name="paragraph2"
                                           onChange={handleChange }
                                           value={values.paragraph2}
                                           required
                                       />
                                       {errors.paragraph2 && (
                                           <p className="help is-danger">
                                               {errors.paragraph2}
                                           </p>
                                       )}
                                   </div>
                               </div>
                               <div className="field">
                     
                                   <div className="control">
                                       <input id="fname"  style={{background:"transparent"}}   placeholder="Ps" 
                                           autoComplete="off"
                                           className={`input ${errors.ps &&
                                               'is-danger'}`}
                                           type="ps"
                                           name="ps"
                                           onChange={handleChange }
                                           value={values.ps}
                                           required
                                       />
                                       {errors.ps && (
                                           <p className="help is-danger">
                                               {errors.ps}
                                           </p>
                                       )}
                                   </div>
                               </div>       
             </form>
            
               </div>
               
             </Container>
             
             </div>
           </React.Fragment>
        )
       
    
}

export default Postcontainer;