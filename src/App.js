import React from 'react';
import Sidebar from './Sidebar.js';
import Upload from './Upload.js';
import Validationform from './Validationform'
import Emailauth from './Emailauth.js';
import {  BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './Register';
import Uploadsecond from './Uploadsecond';
import Uploadedit from './Uploadedit';
import Home from './Home';
import Simplecontainer from './Simplecontainer';
import Taskcontainer from './Taskcontainer';
import Edittask from './Edittask';
import Googlemap from './Googlemap';
import Newscontainer from './Newscontainer';
import Managenews from './Managenews';
import Editnews from './Editnews';
import Postcontainer from './Postcontainer';
import Editpost from './Editpost.js';
import Post from './Post.js';

function App() {
  
  return (
    <React.Fragment>
      <Router>
      <Switch>
      <Route exact path="/" component={Emailauth} />
        <Route path="/Upload" component={Upload} />
        <Route path="/Validationform" component={Validationform} />
        <Route path="/Register" component={Register} />
        <Route path="/Uploadsecond" component={Uploadsecond} />
        <Route path="/Uploadedit" component={Uploadedit} />
        <Route path="/Home" component={Home} />
        <Route path="/Simplecontainer" component={Simplecontainer} />
        <Route path="/Taskcontainer" component={Taskcontainer} />
        <Route path="/Edittask" component={Edittask} />
        <Route path="/Googlemap" component={Googlemap} />
        <Route path="/Newscontainer" component={Newscontainer} />
        <Route path="/Managenews" component={Managenews} />
        <Route path="/Editnews" component={Editnews} />
        <Route path="/Editpost" component={Editpost} />
        <Route path="/Postcontainer" component={Postcontainer} />
        <Route path="/Post" component={Post} />
       </Switch>
      </Router>
      
      
    </React.Fragment>

   
  );
}

export default App;