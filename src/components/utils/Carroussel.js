import React, { useState, useEffect, useContext } from 'react';
import { LikesContext } from '../../contexts/LikesContext';

import likeWhite from '../../assets/icons/likeWhite.png';
import likeWhiteFilled from '../../assets/icons/likeWhiteFilled.png';
import leftArrow from '../../assets/icons/left.png';
import rightArrow from '../../assets/icons/right.png';
import placeholder from '../../assets/images/placeholder.jpg';
import SyncLoader from "react-spinners/SyncLoader";


function Carroussel(props) {

    const { handleLikeContext } = useContext(LikesContext);
    const [liked, setLiked] = useState(window.localStorage.getItem(props.pictures[props.currentIndex].id));
    const [loaded, setLoaded] = useState(false);
    const [picturesLoading, setPicturesLoading] = useState(false);


    useEffect(() => {
        setLiked(window.localStorage.getItem(props.pictures[props.currentIndex].id));
    }, [props.pictures, props.currentIndex])
    

    function handleLeftArrowClick() {
        props.setCurrentIndex(props.currentIndex - 1);
    }

    function handleRightArrowClick() {
        if(!props.pictures[props.currentIndex + 1]) {
            setPicturesLoading(true);
            props.requestPictures(handlePicturesResult);
        } else {
            props.setCurrentIndex(props.currentIndex + 1);    
        }
    } 

    function handlePicturesResult(pictures, last) {
        props.handlePicturesResult(pictures, last);
        if(props.last !== "end") {
            props.setCurrentIndex(props.currentIndex + 1);
        }
        setPicturesLoading(false);
    }


    return(
        <div id="carroussel">
            <img
                className="carrousselPicture"
                src={loaded ? props.pictures[props.currentIndex].picture : placeholder}
                onLoad={() => setLoaded(true)}
                alt="carroussel picture active"
            />

            <div className="carrousselLikeContainer">
                <p className="subtitle white carrousselLikeCount">{props.pictures[props.currentIndex].likes}</p>
                <img
                    onClick={() => handleLikeContext(props.pictures[props.currentIndex].id)}
                    className={liked ? "carrousselLikeIcon carrousselLikeIconSelected" : "carrousselLikeIcon"}
                    src={liked ? likeWhiteFilled : likeWhite}
                    alt="carroussel like icon"
                />
            </div>
            {
                props.currentIndex !== 0 ?
                    <img
                        className="carrousselArrow carrousselLeftArrow"
                        src={leftArrow}
                        onClick={() => handleLeftArrowClick()}
                        alt="left arrow icon"
                    /> :
                    null
            }
            {
                !props.pictures[props.currentIndex + 1] && props.last === "end" ?
                    null :
                    picturesLoading ?
                        <div className="carrousselSpinner">
                            <SyncLoader
                                size={20}
                                color={"#FFF"}
                                loading={true}
                            />
                        </div> :
                        <img
                        className="carrousselArrow carrousselRightArrow"
                        src={rightArrow}
                        onClick={() => handleRightArrowClick()}
                        alt="right arrow icon"
                    />
            }
        </div>
    )
}

export default Carroussel;