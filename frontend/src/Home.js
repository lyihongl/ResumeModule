import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie'

export function Home(loginState) {
    const [snippetsFetched, setSnippetsFetched] = useState(false)
    if (loginState === 0) {
        return (
            <div>
                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Please create an account or login
                </div>
            </div>
        );
    } else if (loginState === 1) {
        var username = JSON.parse(atob(Cookies.get("token").split('.')[1]))['username']
        console.log( JSON.parse(atob(Cookies.get("token").split('.')[1])))
        if(snippetsFetched === false){
            var snippets = GetSnippetsFromDB(username)
        }
        return (
            <div>
                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Welcome {username}
                </div>
                <div className="center-text">
                    Your snippets: 
                </div>
            </div>
        );
    }
}

export function GetSnippetsFromDB(username){
    var request = {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            username: username,
            token: Cookies.get("token")
        }),
        credentials: 'include'
    }
}

function renderSnippetTable(data){

}