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

 function Notification() {
const classes = useStyles();
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);
const [url, setUrl] = useState("");



	const [errors, setErrors] = useState({}) 
const [isSubmitting, setIsSubmitting] = useState(false)
const initialValues = {
  title: "",
  description:""
 
   
}

const handleSubmit  = event => {
    if (event) event.preventDefault()
    // Only validate if the validate function is used
    if (validate) {
        setErrors(validate(values))
    }
    setIsSubmitting(true)
    firebase.firestore().collection("data").doc("notifications").collection("notifications").add({
        Title:`${values.title}`,
        Description:`${values.description}`,
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
      <Container maxWidth="sm" style={{paddingBottom:"25px",boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
        <div component="div" style={{ backgroundColor: '#fff', height: '90vh',boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px" }} >
            <div className={classes.root}>
                <AppBar position="static" style={{padding:"5px" ,background:"#fff"}}>
                <Toolbar style={{background:"#3f51b5",color:"#fff",minHeight:"40px",boxShadow:"rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"}}>
             {/*   <Link to="/Simplecontainer"style={{color:"#fff"}}>
                <ArrowBackIcon/>
                </Link>*/}
                <Typography variant="h6" style={{textAlign:"center"}} className={classes.title}>
                    Notification
                </Typography>
               
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
                <textarea id="fname"  style={{background:"transparent"}}   placeholder="Description" 
                  autoComplete="off"
                  className={`input ${errors.description &&
                    'is-danger'}`}
                  type="description"
                  name="description"
                  onChange={handleChange }
                  value={values.description}
                  required
                />
                {errors.description && (
                  <p className="help is-danger">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
            <Button variant="contained"  onClick={handleSubmit} style={{width:"86%",padding:"11px",marginTop:"20px"}}>
            Action
            </Button>
           
           
      </form>
     
        </div>
        
      </Container>
      
      </div>
    </React.Fragment>
  );
}
export default Notification;