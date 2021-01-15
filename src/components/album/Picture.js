import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { LikesContext } from '../../contexts/LikesContext';

import Modal from '../utils/Modal';
import EditForm from '../utils/EditForm';
import SyncLoader from "react-spinners/SyncLoader";

import deleteIcon from '../../assets/icons/deleteIcon.png';
import edit from '../../assets/icons/edit.png';
import placeholder from '../../assets/images/placeholder.jpg';
import like from '../../assets/icons/like.png';
import likeFilled from '../../assets/icons/likeFilled.png';

import { deletePicture } from '../../firebase/delete';

function Picture(props) {

    const { authState } = useContext(AuthContext);
    const { handleLikeContext } = useContext(LikesContext);
    const [liked, setLiked] = useState(window.localStorage.getItem(props.item.id));

    const [pictureDeleted, setPictureDeleted] = useState(false); // set the display 
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [pictureLoaded, setPictureLoaded] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setLiked(window.localStorage.getItem(props.item.id));
    }, [props.item])


    function handleEdit() { // toggle the edit modal and set the item to edit
        setEditMode(true);
    }

    function handleDelete() {
        setDeleteLoading(true);
        deletePicture(props.item, handleDeleteResult);
    }

    function handleDeleteResult(message) {
        if (message === 'success') {
            setDeleteLoading(false);
            setPictureDeleted(true);
        } else {
            console.log(message);
        }
    }

    function handleClick() {
        props.setPictureSelectedIndex(props.index);
        props.openModal();
    }


    return (
        <div>
            <div className="pictureAlbumContainer">
                {
                    authState && !pictureDeleted ?
                        <div className="pictureAlbumActions">
                            {deleteLoading ?
                                <div className="pictureAlbumDeleteLoading">
                                    <SyncLoader
                                        size={8}
                                        color={"#000"}
                                        loading={true}
                                    />
                                </div>
                                : <img
                                    className="pictureAlbumDelete"
                                    src={deleteIcon}
                                    onClick={() => handleDelete()}
                                    alt="delete icon"
                                />
                            }

                            <img
                                className="pictureAlbumEdit"
                                src={edit}
                                onClick={() => handleEdit()}
                                alt="edit icon"
                            />
                        </div> :
                        null
                }

                <img
                    onLoad={() => setPictureLoaded(true)}
                    onClick={() => handleClick()}
                    className={pictureLoaded ? "pictureAlbum" : "pictureAlbum picturePlaceholder"}
                    src={!pictureLoaded ? placeholder : pictureDeleted ? placeholder : props.item.picture}
                    alt=""
                />

                {!pictureDeleted ?
                    <div className="pictureFooter">
                        {
                            authState ? 
                                <p className="subtitle">{props.item.priority}</p> :
                                <p className="whitespace"></p>
                        }
                        <div className="pictureLikeContainer">
                            <p className="paragraph">{props.item.likes}</p>
                            <img
                                className={liked ? "pictureLike liked" : "pictureLike"}
                                src={liked ? likeFilled : like}
                                onClick={() => handleLikeContext(props.item.id)}
                                alt="like icon"
                            />
                        </div>
                    </div> :
                    null
                }
            </div>

            <Modal modalVisible={editMode} handleClose={() => setEditMode(false)} >
                <EditForm item={props.item} />
            </Modal>
        </div>
    );
}

export default Picture;