import React, { useContext } from 'react';

import Picture from './Picture';
import AddButton from '../utils/AddButton';
 
function PictureMap(props) {

    return(
        <div id="picturesMapContainer">
            <div id="picturesContainer">
                {props.pictures.map((item) => {
                    return (
                        <Picture key={item.id} index={props.pictures.indexOf(item)} item={item} openModal={props.openModal} setPictureSelectedIndex={props.setPictureSelectedIndex} />
                    )
                })}
            </div>

            { props.last !== "end" ?
                <AddButton id="picturesButton" handleClick={() => props.requestPictures(props.handlePicturesResult)} /> :
                <p className="paragraph endOfPicturesMessage">Vous avez vu toutes les photos pour ces tags</p>
            } 

        </div>
        
    );
}

export default PictureMap;