import React, { useState } from 'react';
import ButtonToggle from '../utils/ButtonToggle';
import ButtonLink from '../utils/ButtonLink';

const links ={
    "Animaux": "https://joomeo.com/charley.photos/index.php?login=Sauvages&passwd=Animaux", 
    "Nature": "https://joomeo.com/charley.photos/index.php?login=Sauvegarde&passwd=Nature",
    "France": "https://joomeo.com/charley.photos/index.php?login=Bleu&passwd=France",
    "Voyages": "https://joomeo.com/charley.photos/index.php?login=Ailleurs&passwd=Voyages",
    "Photoclub": "https://joomeo.com/charley.photos/index.php?login=Beau&passwd=Art",
    "Art et Culture": "https://joomeo.com/charley.photos/index.php?login=Beau&passwd=Art",
    "Vie Sociale": "https://joomeo.com/charley.photos/index.php?login=Beau&passwd=Art",
    "Aviation": "https://joomeo.com/charley.photos/index.php?login=Beau&passwd=Art"
}


function AlbumNav(props) {

    console.log("ZONE : ")
    console.log(props.zone)

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
                <ButtonLink 
                    className="albumNavMenuButton" 
                    content="Joomeo" 
                    blank={true} 
                    disabled={props.zone === "Famille"}
                    linkTo={ links[props.zone] }
                    />        
            </nav>

            { props.children }
        </nav>
    );
}

export default AlbumNav;