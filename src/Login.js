import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import './style.css';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '',
            formTitle: 'Login',
            loginBtn: true
        }
    }

    login = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    register = e => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            this.setState({fireErrors: error.message})
        });
    }

    getAction = action => {
        if(action === 'reg'){
            this.setState({formTitle: 'Register New User', loginBtn: false, fireErrors: ''});
        }else{
            this.setState({formTitle: 'Login', loginBtn: true, fireErrors: ''});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        let errorNotification = this.state.fireErrors ? 
            ( <div className="Error"> {this.state.fireErrors} </div> ) : null;

        let submitBtn = this.state.loginBtn ? 
            (<input className="loginBtn" type="submit" onClick={this.login} value="Log in" />) : 
            (<input className="loginBtn" type="submit" onClick={this.login} value="Register" />)

        let login_register = this.state.loginBtn ?
            (<button className="registerBtn" onClick={() => this.getAction('login')}>Register</button>) : 
            (<button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>)

        return(
            <div className="form_block" style={{textAlign:"center", padding:"5%"}}>
                <div id="title"><h2>{this.state.formTitle}</h2></div>
                <div className="body">
                    {errorNotification}
                    <form>
                        <input type="text" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        name="email"
                        placeholder="Enter Email..."
                        style={{width: "30%",
                            padding: "5px",
                            margin: "5px",
                            border: "1px solid #a09c9c"
                        }} /><br/>

                        <input type="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        name="password"
                        placeholder="Password..."
                        style={{width: "30%",
                            padding: "5px",
                            margin: "5px",
                            border: "1px solid #a09c9c"
                        }} /><br/>

                        {submitBtn}
                    </form>
                {/*    {login_register} */}
                </div>
            </div>
        )
    }
}


export default Login;