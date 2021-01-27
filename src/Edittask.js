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
import useFirestoretask from './useFirestoretask.js';


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

 function Edittask(props) {
const classes = useStyles();
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [url, setUrl] = useState("");
const {docp} = useFirestoretask('task');
  console.log(docp);
var count=0;

	const [errors, setErrors] = useState({}) 
const [isSubmitting, setIsSubmitting] = useState(false)
const initialValues = {
  title: "",
  task:"",
  link:""
   
}

const handleSubmit  = event => {
    if (event) event.preventDefault()
    // Only validate if the validate function is used
    if (validate) {
        setErrors(validate(values))
    }
    setIsSubmitting(true)
    firebase.firestore().collection("task").add({
        Title:`${values.title}`,
        Task:`${values.task}`,
        Link:`${values.link}`,
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
        <div component="div" style={{ backgroundColor: '#fff', height: '100vh',boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px" }} >
        {docp && docp.map(docp => (
        
        <form  onSubmit={handleSubmit } style={{marginLeft:"7%"}} value={count++} index={props.location.aboutPropsName} 
        hidden={( props.location.aboutPropsName != count)}>
           
        
       <div >
        <p>{count}</p>

        <div className="field">
							
                            <div className="control">
                                <input id="fname"  style={{background:"transparent"}}   placeholder="Title" 
                                    autoComplete="off"
                                    className={`input ${errors.title &&
                                        'is-danger'}`}
                                    type="title"
                                    name="title"
                                    onChange={handleChange }
                                    value={docp.Title}
                                    required
                                />
                                {errors.title && (
                                    <p className="help is-danger">
                                        {errors.title}
                                    </p>
                                )}
                        
                        <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>    </div>
                        </div>

       <div  className="field" >
							
                            <div className="control">
                              <input id="fname"  style={{background:"transparent"}}   placeholder="Task" 
                              
                                autoComplete="off"
                                className={`input ${errors.task &&
                                  'is-danger'}`}
                                type="task"
                                name="task"
                                onChange={handleChange }
                                value={docp.Task}
                                required
                              />
                              {errors.task && (
                                <p className="help is-danger">
                                  {errors.task}
                                </p>
                              )}
                            </div>
                            <button color="inherit" class="fluid ui button" style={{width:"85%",color:"black",background:"rgb(182 182 186)" ,marginTop:"8%"}} onClick={handleSubmit} >Post</button>
                          </div>
                          
                          
       </div>
       
              
      </form>
     ))} 
        </div>
        
      </Container>
      
      </div>
    </React.Fragment>
  );
}
export default Edittask;