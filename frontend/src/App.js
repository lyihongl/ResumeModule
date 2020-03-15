import React, { useState, useEffect } from 'react';
import './css/App.css';
import {LoginForm} from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { UsePersistedState } from './UsePersistedState.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  //const [loginState, setLoginState] = UsePersistedState('b', 0);
  const [loginState, setLoginState] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/create_account">Create Account</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/create_account">
          </Route>
          <Route path="/login">
            {LoginForm([username, setUsername], [password, setPassword])}
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

//class App extends React.Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      page: ''
//    }
//  }
//
//
//  About() {
//    return <h2>About</h2>;
//  }
//
//  Users() {
//    return <h2>Users</h2>;
//  }
//  Home() {
//    return (
//      <h2 class="center-text">Welcome to Resume Module</h2>
//    );
//  }
//  render() {
//    return (
//      <div>
//        <Router>
//          <ul>
//            <li>
//              <Link to="/">Home</Link>
//            </li>
//            <li>
//              <Link to="/login">Login</Link>
//            </li>
//            <li>
//              <Link to="/create_account">Create Account</Link>
//            </li>
//          </ul>
//          <Switch>
//            <Route path="/create_account">
//              <User.CreateAccount />
//            </Route>
//            <Route path="/login" component={LoginForm}></Route>
//            <Route path="/">
//              <this.Home />
//            </Route>
//          </Switch>
//        </Router>
//      </div>
//    );
//  }
//}

export default App;
