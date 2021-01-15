import React, { useState } from 'react';
import ButtonToggle from '../utils/ButtonToggle';
import ButtonLink from '../utils/ButtonLink';

function AlbumNav(props) {

    const [buttonSelected, setButtonSelected] = useState(null)

    function handleButtonClick(mode) {
        if(buttonSelected === mode) {
            props.setMenuMode(null);
            setButtonSelected(null);       
        } else {
            props.setMenuMode(mode);
            setButtonSelected(mode);
        }
    }

    return (
        <nav className="albumNav">
            <nav className="albumMainNav">
                <ButtonToggle className="albumNavMenuButton" selected={buttonSelected === "zone"} content="Catégories" onClick={() => handleButtonClick("zone")} defaultSelected={false} />
                <ButtonToggle className="albumNavMenuButton" selected={buttonSelected === "tags"} content="Recherche" onClick={() => handleButtonClick("tags")} defaultSelected={false} />
                <ButtonLink className="albumNavMenuButton" content="Joomeo" linkTo="#" />        
            </nav>

            { props.children }
        </nav>
    );
}

export default AlbumNav;