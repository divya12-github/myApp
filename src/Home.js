import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            
        }
    }
    logout = () => {
        firebase.auth().signOut();
    }
    render(){
        return(
            <div>
                <Sidebar />
                
                <button class="ui button" id="lastbtn1" style={{marginTop:"20px",boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                backgroundColor:"#E8E8E8",paddingBottom:"30px"}} onClick={this.logout}>Logout</button>
            </div>
        )
    }

}


export default Home;