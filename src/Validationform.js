import React, { Component } from 'react'
import * as firebase from 'firebase';
import './style.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

class Validationform extends Component{
constructor() {
    super();
    this.state = {
      form: [],
      fields: {},
      errors: {},
      username:"",
      emailid:"",
      mobileno:"",
      password:"",
      values: [
       
      ],
      PagesChoice: {
        news: "news",
        post: "post",
        task: "task",
        user: "user",
        social_umbrella:"social_umbrella",
        heatmap_post:"heatmapPOST",
        heatmap_news:"heatmapNEWS"
      },
      MainObject: {
        Pages: {
          results: []
        }
      },
      checkedValues: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    this.getChckeboxValue = this.getChckeboxValue.bind(this);
  };

 /*
 componentDidMount() {
    let formRef = firebase.firestore();
    formRef.collection("admins").add({
       fields : this.state.fields

    })
  }
*/

  handleChange(e){
   this.setState({
      [e.target.name] : e.target.value
     
    });
   
  }

  getChckeboxValue(e) {
    const { value, checked } = e.target;
    const { results } = this.state.MainObject.Pages;

    if (checked) {
      const newResults = [...results, value];
      this.setState(prevState => ({
        MainObject: {
          ...prevState.MainObject,
          Pages: { ...prevState.MainObject.Pages, results: newResults }
        },
        checkedValues: { ...prevState.checkedValues, [value]: checked }
      }));
    } else {
      const newResults = results.filter(el => el !== value);
      this.setState(prevState => ({
        MainObject: {
          ...prevState.MainObject,
          Pages: { ...prevState.MainObject.Pages, results: newResults }
        },
        checkedValues: { ...prevState.checkedValues, [value]: checked }
      }));
    }
    console.log(this.result)
}
  submituserRegistrationForm(e) {
    e.preventDefault();
    let formRef = firebase.firestore();
    firebase.firestore().collection("admins").add({
      username : this.state.username,
      emailid : this.state.emailid,
      mobileno : this.state.mobileno,
      password : this.state.password,
      pages :this.state.MainObject.Pages.results,
      time:firebase.firestore.FieldValue.serverTimestamp()
   });
    this.setState({
      username:"",
      emailid : "",
      mobileno : "",
      password : "",
      pages :[],
      values:[]
      });
  
    if (this.validateForm()) {
        let fields = {};
        let username = "";
        let emailid = "";
        let mobileno = "";
        let password = "";
        this.setState({
          username:username,
          emailid:emailid,
          mobileno:mobileno,
          password:password
        });
        alert("Form submitted");
    }

  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let username = this.state.username;
    let emailid = this.state.emailid;
    let mobileno = this.state.mobileno;
    let password = this.state.password;

    if (!username) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof username!== "undefined") {
      if (!username.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }

    if (!emailid) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof emailid !== "undefined") {
    
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(emailid)) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!mobileno) {
      formIsValid = false;
      errors["mobileno"] = "*Please enter your mobile no.";
    }

    if (typeof mobileno !== "undefined") {
      if (!mobileno.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid mobile no.";
      }
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof password!== "undefined") {
      if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }

 


render() {
  return (
  <div id="main-registration-container">
    
   <div id="register" style={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"}}>
      <h3 style={{textAlign:"center"}}>Form </h3>
      <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
      <label>Name</label>
      <input type="text" id="input" name="username" value={this.state.username} onChange={this.handleChange} />
      <div className="errorMsg">{this.state.errors.username}</div>
      <label>Email ID:</label>
      <input type="text" id="input" name="emailid" value={this.state.emailid} onChange={this.handleChange}  />
      <div className="errorMsg">{this.state.errors.emailid}</div>
      <label>Mobile No:</label>
      <input type="text" id="input" name="mobileno" value={this.state.mobileno} onChange={this.handleChange}   />
      <div className="errorMsg">{this.state.errors.mobileno}</div>
      <label>Password</label>
      <input type="password" id="input" name="password" value={this.state.password} onChange={this.handleChange} />
      <div className="errorMsg">{this.state.errors.password}</div>
      
  
      <div>
        {Object.keys(this.state.PagesChoice).map(key => (
          <label>
            <input
              name={key}
              type="checkbox"
              value={this.state.PagesChoice[key]}
              className="fill-control-input"
              onChange={this.getChckeboxValue}
            />
            <span style={{marginLeft:"5px"}}>{this.state.PagesChoice[key]}</span>
          </label>
        ))}
        <p>results: {JSON.stringify(this.state.MainObject.Pages.results)}</p>
        
      </div>
      
    
     
      
      <input type="submit" className="button"   value="Submit" style={{ boxShadow:" 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"}} />
      </form>
  </div>
</div>

    );
}


}




export default Validationform;