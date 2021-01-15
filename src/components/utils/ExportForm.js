import React, { useState } from 'react';

import Button from './Button';
import SyncLoader from "react-spinners/SyncLoader";
import TagMenu from '../tags/TagMenu';
import PicturesForm from './PicturesForm';

import { getParentsFromZone, getTagsFromParents } from '../../firebase/import';
import { exportPicture } from "../../firebase/export";


function ExportForm() {
   
    const [pictures, setPictures] = useState([ // This array store the pictures files selected
        { id: 0, picture: null },
        { id: 1, picture: null },
        { id: 2, picture: null },
        { id: 3, picture: null }
    ]); 

    const [multiplePictures, setMultiplePictures] = useState([]); // this array store the multiple pictures selection

    const [zone, setZone] = useState(null); // Current Zone
    const [parents, setParents] = useState([]);
    const [priority, setPriority] = useState(1);
    const [tags, setTags] = useState([]); // tags fetched from the database 
    const [tagsSelected, setTagsSelected] = useState([]);
    const [resetPictures, setResetPictures] = useState(1000); // hacky way to reset component
    const [resetTags, setResetTags] = useState(2000); // hacky way to reset component
    const [exportState, setExportState] = useState("await");

    var count = 0;
    var picturesToExport = null;


    // PICTURES MANAGEMENT
    function updatePictures(e, id) {
        let picturesTemp = pictures;
        if(e == null) { // Delete a picture

            picturesTemp[id] = {id: id, picture: null};

        } else { // Add a picture

            picturesTemp[id] = {id: id, picture: e.target.files[0]}; 
        }
        setPictures(picturesTemp);
    }


    // MULTIPLES PICTURES SELECTION
    function handleMultiplePicturesSelection(e) {
        let fileList = e.target.files;
        let pictures = []
        for(let i = 0; i < fileList.length; i++) {
            pictures.push({id: i, picture: fileList[i]});
        }
        setMultiplePictures(pictures);
    }

    // PRIORITY
    function handlePriorityChange(e) {
        setPriority(e.target.value);
    }


    // ZONE 
    function updateZoneAndGetChildren(e) {
        setTagsSelected([]); // Remove all tags from selection
        setResetTags(resetTags + 1); // reset the TagMenu
        setZone(e.target.value); // set the new zone
        getParentsFromZone(e.target.value, handleParentsResult);
    }

    function handleParentsResult(result) {
        setParents(result);
        getTagsFromParents(result, handleTagsResult);
    }

    function handleTagsResult(result) {
        setTags(result);
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

        if(multiplePictures.length) { // multiples pictures are sent in priority 

            setExportState("exporting"); // Set the export state to loading

            var button = document.getElementsByClassName("exportButton")[0];
            button.disabled = true; // disble the submit button 

            picturesToExport = multiplePictures;

            exportSinglePicture(0);

        } else {

            if(!pictures.filter(item => item.picture !== null).length) { // If no picture selected
                setExportState("selectionnez au moins une photo !");
            } else {
                setExportState("exporting"); // Set the export state to loading 
    
                picturesToExport = pictures.filter((item) => item.picture !== null);
        
                var button = document.getElementsByClassName("exportButton")[0];
                button.disabled = true; // disble the submit button 
        
                exportSinglePicture(0);
            }
        }
    }


    function exportSinglePicture(n) {
        let item = {
            priority: priority,
            picture: picturesToExport[n].picture,
            zone: zone,
            tags: tagsSelected
        }
        exportPicture(item, handleExportResponse);
    }


    async function handleExportResponse(message) {
        if(message === "failure") {
            exportFailure();
        } else {
            count++;
            if(picturesToExport.length === count) {
                exportSuccess();
            } else {
                exportSinglePicture(count);
            }
        }
    }

    function exportFailure() {
        document.getElementById("exportForm").reset();
        var button = document.getElementsByClassName("exportButton")[0];
        button.disabled = false;
        setExportState("failure");
    }

    function exportSuccess() {
        var button = document.getElementsByClassName("exportButton")[0];
        button.disabled = false;
        setExportState("success");
        resetForm();
    }

    function resetForm() {
        document.getElementById("exportForm").reset();
        setPictures([
            { id: 0, picture: null },
            { id: 1, picture: null },
            { id: 2, picture: null },
            { id: 3, picture: null }
        ]);
        setMultiplePictures([]);
        setTagsSelected([]);
        setZone(null);
        setResetPictures(resetPictures + 1);
        setResetTags(resetTags + 1);
    }


    return (
        <form id="exportForm" onSubmit={(e) => handleSubmit(e)}>

            <header className="header">
                <h1 className="title white">Exporter</h1>
            </header>

            <div id="exportFormContent">

                {/* PICTURES */}
                <h3 className="subtitle pictureLabel">PHOTOS</h3>
                <PicturesForm numberOfPictures={4} key={resetPictures} pictures={pictures} onChange={updatePictures} />

                {/* MULTIPLES PICTURES */}
                <h3 className="subtitle multiplePicturesLabel">PHOTOS MULTIPLES</h3>
                <input className="multiplePictures" type="file" multiple onChange={(e) => handleMultiplePicturesSelection(e)} />

                {/* PRIORITY */}
                <h3 className="subtitle priorityLabel">PRIORITY</h3>
                <input className="input priority" defaultValue={1} type="number" required max={1000} onChange={(e) => handlePriorityChange(e)} />

                {/* ZONE */}
                <h3 className="subtitle zoneLabel">ZONE</h3>
                <select className="input zoneInput" name="zone" required onChange={(e) => updateZoneAndGetChildren(e)}>
                    <option defaultValue={zone === null ? true : false} value="">--Choisir--</option>
                    <option value="Nature">NATURE</option>
                    <option value="Vie Sociale">VIE SOCIALE</option>
                    <option value="Famille">FAMILLE</option>
                    <option value="Voyages">VOYAGES</option>
                    <option value="Animaux">ANIMAUX</option>
                    <option value="Art et Culture">ART ET CULTURE</option>
                    <option value="France">FRANCE</option>
                    <option value="Avion">AVION</option>
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
                            defaultTags={[]}
                        /> :
                        <p className="paragraph messageTagsContainer">Selectionnez une zone pour choisir des tags</p>
                    }


                <Button className="exportButton" type="submit" content="Exporter" onClick={() => null} />
                {
                    exportState === "await" ? null :
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
                    <p className="exportMessage paragraph failureMessage">{exportState}</p>
                }
            </div>
        </form>
    );
}

export default ExportForm;
