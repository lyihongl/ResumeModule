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

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function onDragEnd(result, itemState) {
  if (!result.destination) {
    return
  }
  const items = reorder(
    itemState[0],
    result.source.index,
    result.destination.index
  );
  itemState[1](items)
}

function About() {
  const [items, setItems] = useState(getItems(10))
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd([items, setItems])}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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

export default App;
