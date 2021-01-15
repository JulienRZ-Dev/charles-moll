import React from 'react';

import ImagePreview from './ImagePreview';

function PicturesForm(props) {

    return (
        <div id="exportPicturesContainer">
            { props.pictures.map((item) => {
                return (
                    <ImagePreview deleteAvailable={true} key={item.id} id={item.id} picture={null} className="exportPicture" name="picture" onChange={props.onChange} />
                );
            })}
        </div>
    );
}

export default PicturesForm;