import React, { useState, useEffect } from 'react';

import Button from './Button';
import SyncLoader from "react-spinners/SyncLoader";
import TagMenu from '../tags/TagMenu';
import ImagePreview from './ImagePreview';

import { getParentsFromZone, getTagsFromParentsAndZone } from '../../firebase/import';
import { updatePicture } from "../../firebase/update";

function EditForm(props) {

    const [zone, setZone] = useState(props.item.zone); // Current Zone
    const [parents, setParents] = useState([]);
    const [priority, setPriority] = useState(props.item.priority);
    const [tags, setTags] = useState([]); // tags fetched from the database 
    const [tagsSelected, setTagsSelected] = useState(props.item.tags);
    const [resetTags, setResetTags] = useState(1000); // hacky way to reset component
    const [picture, setPicture] = useState(props.item.picture);
    const [exportState, setExportState] = useState("await");


    useEffect(() => {
        getParentsFromZone(zone, handleParentsResult);
    }, [])


    // ZONE 
    function updateZoneAndGetChildren(e) {
        setTagsSelected([]); // Remove all tags from selection
        setResetTags(resetTags + 1); // reset the TagMenu
        setZone(e.target.value); // set the new zone
        getParentsFromZone(e.target.value, handleParentsResult);
    }

    function handleParentsResult(result) {
        setParents(result);
        getTagsFromParentsAndZone(zone, result, handleTagsResult);
    }

    function handleTagsResult(result) {
        setTags(result);
    }

    // PRIORITY
    function handlePriorityChange(e) {
        setPriority(e.target.value);
    }


    // TAGS MANAGEMENT
    function addSubtag(subtag) {
        setTagsSelected([...tagsSelected, subtag]); // Add a tag to the selected tags state
    }

    function removeSubtag(subtag) {
        setTagsSelected(tagsSelected.filter(item => item.title !== subtag.title)); // remove the tag from the selected tags state
    }

    function removeTagsFromParent(parent) {
        setTagsSelected(tagsSelected.filter(item => item.parent !== parent)); // remove all tags from the selected tags state from a parent
    }


    // SUBMIT
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent reload
        setExportState("exporting"); // Set the export state to loading 

        var button = document.getElementsByClassName("exportButton")[0];
        button.disabled = true; // disble the submit button 

        let item = {
            ...props.item,
            priority: priority,
            picture: picture,
            zone: zone,
            tags: tagsSelected
        }

        updatePicture(item, handleExportResponse);
    }


    async function handleExportResponse(message) {
        if (message === "failure") {
            exportFailure();
        } else {
            exportSuccess();
        }
    }

    function exportFailure() {
        var button = document.getElementsByClassName("exportButton")[0];
        button.disabled = false;
        setExportState("failure");
    }

    function exportSuccess() {
        var button = document.getElementsByClassName("exportButton")[0];
        button.disabled = false;
        setExportState("success");
    }


    return (
        <form id="editForm" onSubmit={(e) => handleSubmit(e)}>

            <header className="header">
                <h1 className="title white">Modifier</h1>
            </header>

            <div id="editFormContent">

                {/* PICTURE */}
                <h3 className="subtitle pictureLabel">PHOTO</h3>
                <ImagePreview deleteAvailable={false} className="exportPicture" picture={picture} onChange={(e) => setPicture(e.target.files[0])} />


                {/* PRIORITY */}
                <h3 className="subtitle priorityLabel">PRIORITY</h3>
                <input className="input priority" defaultValue={priority} type="number" max={1000} onChange={(e) => handlePriorityChange(e)} />

                {/* ZONE */}
                <h3 className="subtitle zoneLabel">ZONE</h3>
                <select defaultValue={zone ? zone : ""} className="input zoneInput" name="zone" required onChange={(e) => updateZoneAndGetChildren(e)}>
                    <option value="">--Choisir--</option>
                    <option value="Nature">NATURE</option>
                    <option value="Photoclub">PHOTOCLUB</option>
                    <option value="Vie Sociale">VIE SOCIALE</option>
                    <option value="Famille">FAMILLE</option>
                    <option value="Voyages">VOYAGES</option>
                    <option value="Animaux">ANIMAUX</option>
                    <option value="Art et Culture">ART ET CULTURE</option>
                    <option value="France">FRANCE</option>
                    <option value="Aviation">AVIATION</option>
                </select>


                {/* TAGS */}
                <h3 className="subtitle tagsLabel">TAGS</h3>
                { parents.length ?
                    <TagMenu
                        parents={parents}
                        tags={tags}
                        addSubtag={addSubtag}
                        removeSubtag={removeSubtag}
                        removeTagsFromParent={removeTagsFromParent}
                        key={resetTags}
                        defaultTags={props.item.tags}
                    /> :
                    <p className="paragraph messageTagsContainer">Selectionnez une zone pour choisir des tags</p>
                }


                <Button className="exportButton" type="submit" content="Appliquer" onClick={() => null} />
                {
                    exportState === "success" ? <p className="exportMessage paragraph successMessage">C'est tout bon !</p> :
                        exportState === "failure" ? <p className="exportMessage paragraph failureMessage">Erreur pendant l'export.</p> :
                            exportState === "exporting" ?
                                <div className="exportMessage">
                                    <SyncLoader
                                        size={14}
                                        color={"#000"}
                                        loading={true}
                                    />
                                </div> :
                                null
                }
            </div>
        </form>
    );
}

export default EditForm;