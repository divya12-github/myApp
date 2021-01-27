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
import useForm from './useForm'
import validate from './Validate'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import {Redirect} from 'react-router-dom';


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

 function Taskcontainer() {
const classes = useStyles();
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [url, setUrl] = useState("");



	const [errors, setErrors] = useState({}) 
const [isSubmitting, setIsSubmitting] = useState(false)
const initialValues = {
  title: "",
  task:"",
  link:""
   
}

const handleSubmit  = event => {
  console.log(validate)
    if (event) event.preventDefault()
    // Only validate if the validate function is used
    if (validate) {
        setErrors(validate(values))
       
        firebase.firestore().collection("task").add({
          Title:`${values.title}`,
          Task:`${values.task}`,
          Link:`${values.link}`,
           time: firebase.firestore.FieldValue.serverTimestamp()
  })
      
    }
    setIsSubmitting(true)
    if(values.title && values.task && values.link ){
      alert("form is submitted");
      window.location.reload(true);
    }

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
            <div className={classes.root}>
                <AppBar position="static" style={{padding:"5px" ,background:"#fff"}}>
                <Toolbar style={{background:"#3f51b5",color:"#fff",minHeight:"40px",boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
                <Link to="/Simplecontainer"style={{color:"#fff"}}>
                <ArrowBackIcon/>
                </Link>
                <Typography variant="h6" style={{textAlign:"center"}} className={classes.title}>
                    Add Task
                </Typography>
               
               
                <Button color="inherit" onClick={handleSubmit}  >Post</Button>
              
                </Toolbar>
            </AppBar>
            </div>
        <form onSubmit={handleSubmit } style={{marginLeft:"7%"}}>
           
      
      
        <div className="field">
							
								<div className="control">
									<input id="fname"  style={{background:"transparent"}}   placeholder="Title" 
										autoComplete="off"
										className={`input ${errors.title &&
											'is-danger'}`}
										type="title"
										name="title"
										onChange={handleChange }
										value={values.title}
										required
									/>
									{errors.title && (
										<p className="help is-danger">
											{errors.title}
										</p>
									)}
								</div>
							</div>
                    
              <div className="field">
							
              <div className="control">
                <input id="fname"  style={{background:"transparent"}}   placeholder="Task" 
                  autoComplete="off"
                  className={`input ${errors.task &&
                    'is-danger'}`}
                  type="task"
                  name="task"
                  onChange={handleChange }
                  value={values.task}
                  required
                />
                {errors.task && (
                  <p className="help is-danger">
                    {errors.task}
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
      </form>
     
        </div>
        
      </Container>
      
      </div>
    </React.Fragment>
  );
}
export default Taskcontainer;