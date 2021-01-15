import React from 'react';
import ext from '../../assets/icons/moreExt.png';
import int from '../../assets/icons/moreInt.png';

function AddButton(props) {

    return(
        <div className="addButton" onClick={props.handleClick} >
            <img 
                className="ext"
                src={ext}
                alt="charger plus d'images"
            />
            <img
                className="int"
                src={int}
                alt="charger plus d'images"
            />
        </div>

    );
}

export default AddButton;