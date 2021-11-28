import React, { useState } from 'react';
import Button from './Button';
import SyncLoader from "react-spinners/SyncLoader";

import { exportNewTag } from '../../firebase/export';
import { deleteTag } from '../../firebase/delete';
import { getParentsFromZone } from '../../firebase/import';

function ExportTagForm() {

    const zones = [
        {key: 0, title: "Nature"},
        {key: 1, title: "Vie Sociale"},
        {key: 2, title: "Famille"},
        {key: 3, title: "Voyages"},
        {key: 4, title: "Animaux"},
        {key: 5, title: "Art et Culture"},
        {key: 6, title: "Photoclub"},
        {key: 7, title: "France"},
        {key: 8, title: "Aviation"}
    ];

    const [parents, setParents] = useState([]);
    const [zoneSelected, setZoneSelected] = useState(null);
    const [parentSelected, setParentSelected] = useState(null);
    const [tagState, setTagState] = useState(null);
    const [newTagMessage, setNewTagMessage] = useState(null);
    const [newTag, setNewTag] = useState(null); // new tag to add to the database

    // ZONE
    function handleZoneSelected(name) {
        setZoneSelected(name);
        setParentSelected(null);
        getParentsFromZone(name, handleParentsResult);
    }

    function handleParentsResult(parents) {
        console.log(parents);
        let formattedParents = []
        for(let i = 0; i < parents.length; i++) {
            formattedParents.push({
                key: i,
                title: parents[i]
            })
        }
        setParents(formattedParents);
    }

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
            exportNewTag(newTag, zoneSelected, parentSelected, handleNewTagResult);
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

            {/* NEW TAG ZONE */}
            <div id="newTagZone">
                {
                    zones.map((item) => {
                        return (
                            <div className="checkboxAndLabel" key={item.key}>
                                <input type="radio" className="input" name={"zone"} onChange={() => handleZoneSelected(item.title)} />
                                <label>{item.title}</label>
                            </div>
                        )
                    })
                }
            </div>


            {/* NEW TAG PARENT */}
            <div id="newTagParent">
                {
                    parents.map((item) => {
                        return (
                            <div className="checkboxAndLabel" key={item.key}>
                                <input type="radio" checked={parentSelected === item.title} className="input" name={"parent"} onChange={() => handleParentSelected(item.key)} />
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