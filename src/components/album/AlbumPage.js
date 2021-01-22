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

import exportIcon from '../../assets/icons/exportIcon.png';
import newTagIcon from '../../assets/icons/newTagIcon.png';

import { getParentsFromZone, getTagsFromParents } from '../../firebase/import';
import { importPicturesWithQuerie } from '../../firebase/import';
import { updateLikes } from '../../firebase/update';

import { LikesContext } from '../../contexts/LikesContext';
import { AuthContext } from '../../contexts/AuthContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';

import { Redirect } from 'react-router-dom';


function AlbumPage(props) {

    const { authState } = useContext(AuthContext);
    const { userAuthState } = useContext(UserAuthContext);

    const [headerLoaded, setHeaderLoaded] = useState(false);
    const [parents, setParents] = useState([]); // Parents tags
    const [tags, setTags] = useState([]); // tags for the current zone
    const [tagsSelected, setTagsSelected] = useState([]); // selecte tags 
    const [loading, setLoading] = useState(false); // loading indicator 
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
        importPicturesWithQuerie(props.zone, tagsSelected, 8, null, handleResetPicturesResult);
    }

    function requestPictures(callback) {
        importPicturesWithQuerie(props.zone, tagsSelected, 8, last, callback);
    }

    function handleResetPicturesResult(result, last) { // when a new search is done pictures state must reset
        setLast(last);
        setPictures(result);
        setLoading(false);
    }

    function handlePicturesResult(result, last) { // when the add button is requested the result must be added to the state
        setLast(last);
        setPictures(pictures.concat(result));
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