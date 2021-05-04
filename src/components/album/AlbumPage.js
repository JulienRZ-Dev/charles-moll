import React, { useState, useEffect, useContext } from 'react';

import PictureMap from './PictureMap';
import MainTag from '../tags/MainTag';
import TagMenu from '../tags/TagMenu';
import SearchButton from '../utils/SearchButton';
import Carroussel from '../utils/Carroussel';
import Modal from '../utils/Modal';
import ExportForm from '../utils/ExportForm';
import ExportTagForm from '../utils/ExportTagForm';
import AlbumNav from './AlbumNav';
import AlbumZones from './AlbumZones';
import Footer from '../portfolio/footer';

import SyncLoader from "react-spinners/SyncLoader";

import exportIcon from '../../assets/icons/exportIcon.png';
import newTagIcon from '../../assets/icons/newTagIcon.png';

import { getParentsFromZone, getTagsFromParents } from '../../firebase/import';
import { importPicturesWithQuerie } from '../../firebase/import';
import { updateLikes } from '../../firebase/update';

import { LikesContext } from '../../contexts/LikesContext';
import { AuthContext } from '../../contexts/AuthContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';

import { Redirect } from 'react-router-dom';
import { deletePicture, deletePicturesFromTags } from '../../firebase/delete';


function AlbumPage(props) {

    const { authState } = useContext(AuthContext);
    const { userAuthState } = useContext(UserAuthContext);

    const [headerLoaded, setHeaderLoaded] = useState(false);
    const [parents, setParents] = useState([]); // Parents tags
    const [tags, setTags] = useState([]); // tags for the current zone
    const [tagsSelected, setTagsSelected] = useState([]); // selecte tags 
    const [loading, setLoading] = useState(false); // loading indicator 
    const [picturesDeleteLoading, setPicturesDeleteLoading] = useState(false);
    const [last, setLast] = useState(null); // last document from firebase ( for pagination )
    const [pictures, setPictures] = useState([]); // pictures loaded from firebase
    const [resetCount, setResetCount] = useState(0); // hack for reset components

    const [menuMode, setMenuMode] = useState(null); // Menu 

    const [carrouselVisible, setCarrouselVisible] = useState(false); // modal control
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [exportTagModalVisible, setExportTagModalVisible] = useState(false);

    const [pictureSelectedIndex, setPictureSelectedIndex] = useState(0); // Picture selection for the carroussel


    // TAG LIST
    useEffect(() => {
        window.scrollTo(0, 0);
        getParentsFromZone(props.zone, handleParentsResult);
        requestPictures(handlePicturesResult);
    }, []);


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


    // PICTURES REQUESTS
    function handleSearch() {
        setLoading(true);
        importPicturesWithQuerie(props.zone, tagsSelected, 16, null, handleResetPicturesResult);
    }

    function requestPictures(callback) {
        importPicturesWithQuerie(props.zone, tagsSelected, 16, last, callback);
    }

    function handleResetPicturesResult(result, last) { // when a new search is done pictures state must reset
        setLast(last);
        setPictures(result);
        setLoading(false);
    }

    function handlePicturesResult(result, last) { // when the add button is requested the result must be added to the state
        if(result) {
            setLast(last);
            setPictures(pictures.concat(result));
        } else {
            console.log('no more pictures')
        }
    }

    function resetTagSelection() {
        setTagsSelected([]);
        setResetCount(resetCount + 1);
    }

    function handleLikeContext(id) {
        if (window.localStorage.getItem(id)) { // picture already liked
            updateLikes(id, pictures.find(el => el.id === id).likes - 1);
            window.localStorage.removeItem(id);
            setPictures(pictures.map(item => item.id === id ? { ...item, likes: item.likes - 1 } : item));
        } else {                                        // Picture not liked 
            updateLikes(id, pictures.find(el => el.id === id).likes + 1);
            window.localStorage.setItem(id, true);
            setPictures(pictures.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item));
        }
    }

    function handlePictureDeletion() {
        setPicturesDeleteLoading(true);
        deletePicturesFromTags(tagsSelected, props.zone, onPicturesDeleted);
    }

    function onPicturesDeleted(message) {
        if(message === "success") {
            setPicturesDeleteLoading(false);
        }
    } 


    return (
        <div>
            {
                props.zone === "Famille" && !userAuthState && !authState ?
                    <Redirect to="/authentification" /> :
                    <div id="albumContainer">
                        <header className="albumHeader">
                            <h1 className="albumHeaderTitle titleLetterSpaced white">{props.zone}</h1>
                            <img
                                className="albumHeaderPicture"
                                onLoad={() => setHeaderLoaded(true)}
                                src={headerLoaded ? props.zonePicture : props.placeholder}
                                alt=""
                            />
                            {
                                authState ?
                                    <div className="exportIcons">
                                        <img
                                            className="albumHeaderExportIcon"
                                            src={exportIcon}
                                            onClick={() => setExportModalVisible(true)}
                                            alt=""
                                        />
                                        <img
                                            className="albumHeaderExportIcon"
                                            src={newTagIcon}
                                            onClick={() => setExportTagModalVisible(true)}
                                            alt=""
                                        />
                                        
                                        { picturesDeleteLoading ? 
                                            <div>
                                                <SyncLoader
                                                    size={8}
                                                    color={"#000"}
                                                    loading={true}
                                                />
                                            </div>
                                        : 
                                            <svg className="albumHeaderExportIcon" onClick={() => handlePictureDeletion()} width="100" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M77.5 29.1667V27.5H79.1667H81.6667V25V16.6667V14.1667H79.1667H65.6189L62.1845 10.7322L61.4522 10H60.4167H39.5834H38.5478L37.8156 10.7322L34.3812 14.1667H20.8334H18.3334V16.6667V25V27.5H20.8334H22.5V29.1667V79.1667C22.5 85.1307 27.3693 90 33.3334 90H66.6667C72.6308 90 77.5 85.1307 77.5 79.1667V29.1667ZM51.7678 54.2261L58.8334 47.1605L61.1728 49.5L54.1073 56.5656L52.3395 58.3333L54.1073 60.1011L61.1728 67.1667L58.8334 69.5061L51.7678 62.4406L50 60.6728L48.2323 62.4406L41.1667 69.5061L38.8272 67.1667L45.8928 60.1011L47.6647 58.3292L45.8886 56.5614L38.7897 49.4958L41.1292 47.1564L48.2364 54.2303L50.0042 55.9897L51.7678 54.2261Z" fill="#FF0000" stroke="white" stroke-width="5"/>
                                            </svg>
                                        }

                                    </div>
                                    :
                                    null
                            }
                        </header>

                        <AlbumNav setMenuMode={setMenuMode}>
                            {
                                menuMode === "zone" ?
                                    <AlbumZones zone={props.zone} /> :
                                    menuMode === "tags" ?
                                        <div id="albumNavContainer">
                                            <MainTag selected={!tagsSelected.length} id="mainTag" handleClick={() => resetTagSelection()} content="Tous" />
                                            <TagMenu
                                                key={resetCount} // hacky way to reset the component
                                                parents={parents}
                                                tags={tags}
                                                addSubtag={addSubtag}
                                                removeSubtag={removeSubtag}
                                                removeTagsFromParent={removeTagsFromParent}
                                                defaultTags={[]}
                                            />
                                            <SearchButton loading={loading} handleClick={() => handleSearch()} />
                                        </div> : null
                            }
                        </AlbumNav>

                        <LikesContext.Provider value={{ handleLikeContext }}>

                            <PictureMap
                                last={last}
                                pictures={pictures}
                                requestPictures={requestPictures}
                                handlePicturesResult={handlePicturesResult}
                                openModal={() => setCarrouselVisible(true)}
                                setPictureSelectedIndex={setPictureSelectedIndex}
                            />

                            {/* MODALS */}

                            {/* CARROUSEL */}
                            <Modal modalVisible={carrouselVisible} handleClose={() => setCarrouselVisible(false)}>
                                <Carroussel
                                    pictures={pictures}
                                    requestPictures={requestPictures}
                                    handlePicturesResult={handlePicturesResult}
                                    currentIndex={pictureSelectedIndex}
                                    setCurrentIndex={setPictureSelectedIndex}
                                    last={last}
                                />
                            </Modal>

                            {/* EXPORT PICTURE */}
                            <Modal modalVisible={exportModalVisible} handleClose={() => setExportModalVisible(false)} >
                                <ExportForm />
                            </Modal>

                            {/* EXPORT TAG */}
                            <Modal modalVisible={exportTagModalVisible} handleClose={() => setExportTagModalVisible(false)} >
                                <ExportTagForm />
                            </Modal>

                        </LikesContext.Provider>

                        <Footer shouldHaveMargin={false} />
                    </div>
            }
        </div>
    );
}

export default AlbumPage;