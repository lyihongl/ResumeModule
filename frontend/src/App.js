import React, { useState, useEffect } from 'react';
import './css/App.css';
import { LoginForm } from './Login.js';
import { Home } from './Home.js'
import { CreateAccount } from './CreateAccount.js';
import { UsePersistedState } from './UsePersistedState.js'
import Cookies from 'js-cookie'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function About() {
  const initialData = {
    column: {
      id: 'column-1',
      numberIds: ['four', 'one', 'five', 'three', 'two'],
    },
    numbers: {
      'five': { id: 'five', content: '5' },
      'four': { id: 'four', content: '4' },
      'one': { id: 'one', content: '1' },
      'three': { id: 'three', content: '3' },
      'two': { id: 'two', content: '2' },
    }
  };
  return (
    <div>
      <DragDropContext>

      </DragDropContext>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  //const [loginState, setLoginState] = UsePersistedState('b', 0);
  var ls = 0
  if (Cookies.get("token") != null) {
    ls = 1
  }
  const [loginState, setLoginState] = useState(ls);
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
            {About()}
          </Route>
          <Route path="/login">
            {() => {
              if (loginState === 1) {
                window.location.href = "../"
              } else {
                return LoginForm([username, setUsername], [password, setPassword], setLoginState)
              }
            }}
          </Route>
          <Route path="/">
            {Home(loginState)}
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
