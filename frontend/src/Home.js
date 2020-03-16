import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie'
import Modal from 'react-modal'

Modal.setAppElement("#root")

export function Home(loginState) {
    const [snippetsFetched, setSnippetsFetched] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        if (loginState === 1) {
            setUsername(JSON.parse(atob(Cookies.get("token").split('.')[1]))['username']);
            console.log(JSON.parse(atob(Cookies.get("token").split('.')[1])));
            GetSnippetsFromDB(username).then(
                (result) => {
                    setTableData(result) //console.log(result)
                }
            )
        }
    }, [username]);
    console.log("table data 2", tableData)

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
        return (
            <div>
                <Modal
                    isOpen={showModal}
                    contentLabel="Minimal Modal Example"
                    onRequestClose={() => setShowModal(false)}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={(e) => setShowModal(false)}>Close Modal</button>
                </Modal>
                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Welcome {username}
                </div>
                <div className="center-text">
                    Your snippets:
                    <table id="test">
                        <tbody className="center-text">
                            {renderSnippetTable(tableData, setShowModal)}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}

export function GetSnippetsFromDB(username) {
    console.log("pinging server")
    var request = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            username: username,
        }),
        credentials: 'include'
    }
    return fetch("http://127.0.0.1:9090/api/get_snippets", request)
        .then(
            response => {
                console.log(response)
                return response.json()
            }
        )
        .then(
            (data) => {
                return data
            }
        )
        .catch(() => console.log("wow"))
}

function handleOpenModal(setShowModal) {
    setShowModal(true)
}

function renderSnippetTable(data, setShowModal) {
    if (data != null) {
        return data.map((row, index) => {
            const { Id, Uid, SnippetName, Data } = row
            console.log(row)
            return (
                <tr key={Id}>
                    <td>
                        {SnippetName}
                    </td>
                    <td>
                        <a href="#" onClick={(e) => setShowModal(true)}>View</a>
                    </td>
                    <td>
                        <a href="#" onClick={(e) => test({ Id })}>Edit</a>
                    </td>
                </tr>
            )
        })
    }
    //console.log(data.map(_data => _data))
}

function test(id) {
    console.log(id)
}