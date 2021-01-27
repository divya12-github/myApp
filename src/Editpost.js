import React ,{ Component ,useState, useCallback, useRef, useEffect  }from 'react';
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
import {  BrowserRouter as Router, Route, Link ,useHistory,Switch } from 'react-router-dom';
import * as firebase from 'firebase';
import Validationform from './Validationform';
import useForm from './useForm';
import validate from './Validate';
import useFirestorepost from './useFirestorepost.js';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
  }));

 function Editpost(props) {
const classes = useStyles();
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [url, setUrl] = useState("");
const{postdata}=useFirestorepost('feed');
var count=0;

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

const handleSubmit  = event => {
    if (event) event.preventDefault()
    // Only validate if the validate function is used
    if (validate) {
        setErrors(validate(values))
    }
    setIsSubmitting(true)
    firebase.firestore().collection("news").add({
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
}
const {values,handleChange}  = useForm(
    initialValues,
    login,
    validate,
    
)
function login() {
    console.log('No errors, submit callback called!')
}

    
 
   
  return (
    <React.Fragment>
     <div>
        
      <CssBaseline />
      <Container maxWidth="sm" style={{boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
        <div component="div" style={{ backgroundColor: '#fff', height: 'auto',paddingBottom:"10px",marginBottom:"10px", boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px" }} >
        {postdata && postdata.map(postdata => (
        
        <form  onSubmit={handleSubmit } style={{marginLeft:"7%"}} value={count++} index={props.location.aboutPropsName} 
        hidden={( props.location.aboutPropsName != count)}>
           
        
       <div >
        <p>{count}</p>

        <div className="field">
							
                            <div className="control">
                                <input id="fname"  style={{background:"transparent"}}   placeholder={postdata.imagetitle} 
                                    autoComplete="off"
                                    className={`input ${errors.title &&
                                        'is-danger'}`}
                                    type="title"
                                    name="title"
                                    onChange={handleChange }
                                    value={postdata.imagetitle}
                                    required
                                />
                                {errors.title && (
                                    <p className="help is-danger">
                                        {errors.imagetitle}
                                    </p>
                                )}
                        </div>
                        <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>    </div>
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
                         value={postdata.shortdescription}
                         required
                       />
                       {errors.short_description && (
                         <p className="help is-danger">
                           {errors.short_description}
                         </p>
                       )}
                     </div>
                     <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                         value={postdata.phone_no}
                         required
                       />
                       {errors.phone && (
                         <p className="help is-danger">
                           {errors.phone}
                         </p>
                       )}
                     </div>
                     <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                         value={postdata.Link}
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
                                       value={postdata.back_link}
                                       required
                                     />
                                     {errors.back_link && (
                                       <p className="help is-danger">
                                         {errors.back_link}
                                       </p>
                                     )}
                                   </div>
                                   <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                                           value={postdata.Title}
                                           required
                                       />
                                       {errors.back_title && (
                                           <p className="help is-danger">
                                               {errors.back_title}
                                           </p>
                                       )}
                                   </div>
                                   <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                                           value={postdata.Paragraph1}
                                           required
                                       />
                                       {errors.paragraph1 && (
                                           <p className="help is-danger">
                                               {errors.paragraph1}
                                           </p>
                                       )}
                                   </div>
                                   <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                                           value={postdata.Paragraph2}
                                           required
                                       />
                                       {errors.paragraph2 && (
                                           <p className="help is-danger">
                                               {errors.paragraph2}
                                           </p>
                                       )}
                                   </div>
                                   <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
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
                                           value={postdata.Ps}
                                           required
                                       />
                                       {errors.ps && (
                                           <p className="help is-danger">
                                               {errors.ps}
                                           </p>
                                       )}
                                   </div>
                                   <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
                               </div>        
       
       
              
      </form>
     ))} 
        </div>
        
      </Container>
      
      </div>
    </React.Fragment>
  );
}
export default Editpost;