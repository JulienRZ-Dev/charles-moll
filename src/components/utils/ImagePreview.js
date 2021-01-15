import React, { useState } from 'react';

import deleteIcon from '../../assets/icons/deleteIcon.png';

const ImagePreview = (props) => {

    const [picture, setPicture] = useState(props.picture);

    function handleChange(e) {
        setPicture(URL.createObjectURL(e.target.files[0])); // crée un ObjectURL du fichier selectionné
        props.onChange(e, props.id);
    }

    function handleReset() {
        setPicture(null);
        props.onChange(null, props.id);
    }
    

    return (
        <div id={props.id} className={props.className + " previewContainer"}
            style={ picture ? {backgroundImage: `url(${picture})`, backgroundSize: "cover"} : {backgroundSize: "auto"}}
        >
            { picture && props.deleteAvailable ?
                <img 
                    className={"imagePreviewDeleteIcon"}
                    src={deleteIcon}
                    alt={"Icône supprimer"}
                    onClick={() => handleReset()}
                /> :
                null
            }

            <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                name={props.name}
                required={props.required}
                onChange={(e) => handleChange(e)}
                className="inputImagePreview"
            />
        </div>
    );
}

export default ImagePreview;                                                                                        