import React, { useState, useEffect } from 'react';
import "./css/App.css"
import Cookies from 'js-cookie'
import endpoint from './EndPoint.js'

function handleSubmit(event, username, password, loginState) {
    //alert(this.state.username+" "+ this.state.password)
    //console.log("wtf")
    var request = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include'
    }
    fetch(endpoint+"/api/login", request)
        .then(
            response => {
                console.log(response);
                return response.json()
            }
        )
        .then((data) => {
            console.log(data)
            console.log("cookies", Cookies.get())
            if (Cookies.get("token") != null) {
                console.log(JSON.parse(atob(Cookies.get("token").split('.')[1])))
                loginState(1)
            } else {
                loginState(0)
            }
        });
        event.preventDefault()
    //console.log(request)
}

function LoginForm(username, password, loginState) {
    return (
        <div className="App">
            <form method="POST" onSubmit={(e) => handleSubmit(e, username[0], password[0], loginState)}>
                <div>
                    Username:
                </div>
                <div>
                    <input type="text" onChange={(e) => { username[1](e.target.value) }}></input>
                </div>
                <div>
                    Password:
                </div>
                <div>
                    <input type="password" onChange={(e) => { password[1](e.target.value) }}></input>
                </div>
                <div>
                    <input type="submit" ></input>
                </div>

            </form>
        </div>
    );

}


//class LoginForm extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            username: '',
//            password: '',
//            loggedIn: 0
//        };
//    }
//    handleSubmit() {
//        //alert(this.state.username+" "+ this.state.password)
//        var request = {
//            method: "POST",
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json',
//            }, body: JSON.stringify({
//                username: this.state.username,
//                password: this.state.password,
//            }),
//        }
//        fetch("http://127.0.0.1:9090/api/login", request)
//            .then(
//                response => {
//                    return response.json()
//                }
//            )
//            .then((data)=>{
//                console.log(data)
//            });
//        //console.log(request)
//    }
//    render() {
//        return (
//            <div className="App">
//                <div>
//                    Username:
//                </div>
//                <div>
//                    <input type="text" id="username" onChange={(e) => { this.setState({ username: e.target.value }) }}></input>
//                </div>
//                <div>
//                    Password:
//                </div>
//                <div>
//                    <input type="password" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }}></input>
//                </div>
//                <input type="submit" onClick={() => { this.handleSubmit(); this.state.loggedIn = 1 }}></input>
//            </div>
//        );
//    }
//};

export { LoginForm };