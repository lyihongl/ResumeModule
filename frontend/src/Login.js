import React from 'react';
import './App.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleSubmit() {
        //alert(this.state.username+" "+ this.state.password)
        var request = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        }
        fetch("http://127.0.0.1:9090/api/login", request)
        console.log(request)
    }
    render() {
        return (
            <div className="App">
                <div>
                    Username:
                </div>
                <div>
                    <input type="text" id="username" onChange={(e) => { this.setState({ username: e.target.value }) }}></input>
                </div>
                <div>
                    Password:
                </div>
                <div>
                    <input type="password" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }}></input>
                </div>
                <input type="submit" onClick={() => this.handleSubmit()}></input>
            </div>
        );
    }
};

export default LoginForm;