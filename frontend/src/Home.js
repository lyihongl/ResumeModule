import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie'
import Modal from 'react-modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

Modal.setAppElement("#root")

function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function genItems(tableData) {
    if (tableData != null) {
        return tableData.map((data, index) => ({
            id: data["SnippetName"],
            index: index,
            content: data["SnippetName"]
        }))
    } else {
        return null
    }
}
function onDragEnd(result, lists) {
    const { source, destination } = result
    if (!destination) {
        return
    }
    //const resultList = Array.from(lists[0])
    var resultList = null
    if (source.droppableId == destination.droppableId) {
        //console.log(source.droppableId, lists)
        const resultList = Array.from(lists[source.droppableId][0])
        const [removed] = resultList.splice(source.index, 1)
        resultList.splice(destination.index, 0, removed)
        lists[source.droppableId][0] = resultList
    } else {
        const sourceClone = Array.from(lists[source.droppableId][0])
        const destClone = Array.from(lists[destination.droppableId][0])
        const [removed] = sourceClone.splice(source.index, 1)
        destClone.splice(destination.index, 0, removed)

        lists[source.droppableId][0] = sourceClone
        lists[destination.droppableId][0] = destClone
    }

    //if(source.droppableId == destination.droppableId) {
    //const items = reorder()
    //}
    //[itemState[0][result.source.index], itemState[0][result.destination.index]] = [itemState[0][result.destination.index], itemState[0][result.source.index]];
    for (var key in lists) {
        //console.log("key", key, lists[key][0])
        lists[key][1](lists[key][0])
    }
}
const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,


    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

export function Home(loginState) {
    //const [snippetsFetched, setSnippetsFetched] = useState(false)
    const [tableData, setTableData] = useState(null)
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState([false, 0])
    const [createModal, setCreateModal] = useState(false)
    const [items, setItems] = useState(genItems(tableData))
    const [items2, setItems2] = useState([])
    const lists = {
        droppable: [items, setItems],
        droppable2: [items2, setItems2]
    }

    if (items === null && tableData != null) {
        setItems(genItems(tableData))
    }
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
    } else if (loginState === 1 && tableData != null && items != null) {
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
                <Modal
                    isOpen={createModal}
                    onRequestClose={() => setCreateModal(false)}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={() => setCreateModal(false)}>Close</button>
                    {createSnippet()}
                </Modal>
                <h2 className="center-text">Welcome to Resume Module</h2>
                <div className="center-text">
                    Welcome {username}
                </div>
                <div className="center-div center-text">
                    <button onClick={() => setCreateModal(true)}> Create New Snippet</button>
                </div>
                <div className="center-text">
                    Your snippets:
                        <div className="center-div center-text css-grid">
                        <DragDropContext onDragEnd={(r) => onDragEnd(r, lists)} className="center-div">
                            <Droppable droppableId="droppable">
                                {
                                    (provided, snapshot) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div className="center-text"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <a className="dnd-link" href="#" onClick={((e) => setShowModal([true, item.index]))}>{item.content}</a>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <Droppable droppableId="droppable2">
                                {
                                    (provided, snapshot) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {items2.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div className="center-text"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <a href="#" className="dnd-link" onClick={((e) => setShowModal([true, item.index]))}>{item.content}</a>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                        </DragDropContext>
                    </div>


                    {/*

                    <table className="center-div" id="test">
                        <tbody className="center-text">
                            {renderSnippetTable(tableData, setShowModal)}
                        </tbody>
                    </table>
                    */
                    }
                </div>
            </div>
        );

    }
}

function renderSnippet(data, updateData, index) {
    return (
        <div>
            <div>
                Title:
                <input value={data[index]["SnippetName"]} onChange={(e) => {
                    let dataCopy = JSON.parse(JSON.stringify(data))
                    dataCopy[index].SnippetName = e.target.value
                    updateData(dataCopy)
                }}></input>
            </div>
            <div>
                <textarea rows="20" cols="100" value={data[index]["Data"]} onChange={(e) => {
                    let dataCopy = JSON.parse(JSON.stringify(data))
                    dataCopy[index].Data = e.target.value
                    updateData(dataCopy)
                }}>
                </textarea>

            </div>

        </div>
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

//function renderSnippetTable(data, setShowModal) {
//    if (data != null) {
//        return data.map((row, index) => {
//            const { Id, Uid, SnippetName, Data } = row
//            //console.log(row)
//            return (
//                <tr key={Id}>
//                    <td>
//                        {index}
//                    </td>
//                    <td>
//                        <a href="#" onClick={((e) => setShowModal([true, index]))}>{SnippetName}</a>
//                    </td>
//                </tr>
//            )
//        })
//    }
//}

function createSnippet() {
    return (
        <div>
            <div>
                Create New Snippet
            </div>
            <label>Title:</label>
            <input type="text"></input>
            <div>
                <textarea rows="20" cols="100"></textarea>
            </div>
        </div>
    );
}