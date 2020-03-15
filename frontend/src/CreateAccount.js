import React, {useState} from 'react';
import "./css/App.css"

function Test(){
    return(
        <h2>test</h2>
    );
}

export function CreateAccount() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="App">
            <div>
                Email:
            </div>
            <div>
                <input type="text" id="username" onChange={(e) => { }}></input>
            </div>
            <div>
                Username:
            </div>
            <div>
                <input type="text" id="username" onChange={(e) => { } }></input>
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password" id="password" onChange={(e) => { }}></input>
            </div>
            <input type="submit" onClick={() => {}}></input>
        </div>
    );
}

export default Test;