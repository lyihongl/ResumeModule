import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function items(tableData){

}

export function Home(loginState) {
    const [snippetsFetched, setSnippetsFetched] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState([false, 0])
    //const [edit, setEdit] = useState(false)
    useEffect(() => {
        if (loginState === 1) {
            setUsername(JSON.parse(atob(Cookies.get("token").split('.')[1]))['username']);
            //console.log(JSON.parse(atob(Cookies.get("token").split('.')[1])));
            GetSnippetsFromDB(username).then(
                (result) => {
                    setTableData(result) //console.log(result)
                }
            )
        }
    }, [username]);
    //if(tableData != null){
    //    console.log("table data 2", tableData[0]["Data"])
    //}

    //console.log("edit:", edit)
    if (loginState === 0) {
        return (
            <div>

                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Please create an account or login
                </div>
            </div>
        );
    } else if (loginState === 1 && tableData != null) {
       
        return (
            <div>
                <Modal
                    isOpen={showModal[0]}
                    contentLabel="Minimal Modal Example"
                    onRequestClose={() => closeModal(setShowModal)}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={(e) => closeModal(setShowModal)}>Close</button>
                    <button onClick={(e) => console.log("save")}>Save</button>
                    <div dangerouslySetInnerHTML={{ __html: tableData[showModal[1]]["Data"] }}></div>
                    {renderSnippet(tableData, setTableData, showModal[1])}
                </Modal>
                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Welcome {username}
                </div>
                <div className="center-text">
                    Your snippets:
                    <table className="center-div" id="test">
                        <tbody className="center-text">
                            {renderSnippetTable(tableData, setShowModal)}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    }
}

function renderSnippet(data, updateData, index) {
    return (
        <textarea rows="20" cols="100" value={data[index]["Data"]} onChange={(e) => {
            let dataCopy = JSON.parse(JSON.stringify(data))
            dataCopy[index].Data = e.target.value
            updateData(dataCopy)
        }}>
        </textarea>
    );
}

function closeModal(showModal) {
    showModal([false, 0])
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
                //console.log(response)
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
            //console.log(row)
            return (
                <tr key={Id}>
                    <td>
                        {index}
                    </td>
                    <td>
                        <a href="#" onClick={((e) => setShowModal([true, index]))}>{SnippetName}</a>
                    </td>
                </tr>
            )
        })
    }
    //console.log(data.map(_data => _data))
}