import React, { useState } from 'react';
import Button from './Button';
import SyncLoader from "react-spinners/SyncLoader";

import { exportNewTag } from '../../firebase/export';
import { deleteTag } from '../../firebase/delete';

function ExportTagForm() {

    const parents = [
        {title: "Pays", key: 0},
        {title: "Region", key: 1},
        {title: "Date", key: 2},
        {title: "Lieux", key: 3},
        {title: "Nom", key: 4},
        {title: "Evenements", key: 5}
    ];

    const [parentSelected, setParentSelected] = useState(null);
    const [tagState, setTagState] = useState(null);
    const [newTagMessage, setNewTagMessage] = useState(null);
    const [newTag, setNewTag] = useState(null); // new tag to add to the database


    // PARENT TAG
    function handleParentSelected(key) {
        setParentSelected(parents[key].title);
    }


    // NEW TAG
    function handleNewTagSubmit() {
        if(!parentSelected) {
            handleNewTagResult("failure", "Un tag principal doit être selectionné");
        } else if(!newTag.length) {
            handleNewTagResult("failure", "Le tag ne peut pas être vide");
        } else {
            setTagState("loading");
            exportNewTag(newTag, parentSelected, handleNewTagResult);
        }
    }


    function handleNewTagDelete() {
        if(!parentSelected) {
            handleNewTagResult("failure", "Un tag principal doit être selectionné");
        } else if(!newTag.length) {
            handleNewTagResult("failure", "Le tag ne peut pas être vide");
        } else {
            setTagState("loading");
            deleteTag(newTag, parentSelected, handleNewTagResult);
        }
    }


    function handleNewTagResult(state, message) {
        setTagState(state);
        setNewTagMessage(message);
        document.getElementById("newTag").value = "";
    }


    return (
        <form id="newTagForm" onSubmit={(e) => e.preventDefault()}>

            {/* NEW TAG TITLE */}
            <header className="header" id="newTagHeader">
                <h1 className="title white">Nouveau tag</h1>
            </header>

            {/* NEW TAG PARENT */}
            <div id="newTagParent">
                {
                    parents.map((item) => {
                        return (
                            <div className="checkboxAndLabel" key={item.key}>
                                <input type="radio" className="input" name={"group"} onChange={() => handleParentSelected(item.key)} />
                                <label>{item.title}</label>
                            </div>
                        )
                    })
                }
            </div>

            {/* NEW TAG */}
            <input className="input" id="newTag" required name="newTag" onChange={(e) => setNewTag(e.target.value)} />

            {/* NEW TAG BUTTON */}
            <Button className="tagFormButton" type="button" content="Ajouter" onClick={() => handleNewTagSubmit()} />

            {/* HANDLE TAG DELETE */}
            <Button className="tagFormButton" type="button" content="Supprimer" onClick={() => handleNewTagDelete()} />

            {/* NEW TAG MESSAGE */}
            <div className="messageContainer">
            {
                tagState ?
                    tagState === "loading" ? // spinner to indicate loading
                        <SyncLoader
                            size={14}
                            color={"#000"}
                            loading={true}
                        /> :
                        tagState === "success" ?
                            <p className="paragraph successMessage">{newTagMessage}</p> :
                            <p className="paragraph failureMessage">{newTagMessage}</p> : // tag already exists
                    null // No message 
            }
            </div>

        </form>
    );
}

export default ExportTagForm;