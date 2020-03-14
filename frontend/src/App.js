import React from 'react';
import './App.css';
import LoginForm from './Login.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: ''
    }
  }


  About() {
    return <h2>About</h2>;
  }

  Users() {
    return <h2>Users</h2>;
  }
  Home() {
    return <h2>Home</h2>
  }
  render() {
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
          </ul>
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/">
              <this.Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
