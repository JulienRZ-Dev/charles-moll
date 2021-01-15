import React from 'react';
import { Link } from 'react-router-dom';

import animaux from '../../assets/images/animauxXs.jpg';
import art from '../../assets/images/artXs.jpg';
import avion from '../../assets/images/avionXs.jpg';
import famille from '../../assets/images/familleXs.jpg';
import france from '../../assets/images/franceXs.jpg';
import nature from '../../assets/images/natureXs.jpg';
import photoclub from '../../assets/images/photoclubXs.jpg';
import viesociale from '../../assets/images/viesocialeXs.jpg';
import voyages from '../../assets/images/voyagesXs.jpg';

function AlbumZones(props) {

    const zones = [
        { name: "Animaux", link: "animaux", picture: animaux },
        { name: "Art et Culture", link: "art", picture: art },
        { name: "Avion", link: "avion", picture: avion },
        { name: "Famille", link: "famille", picture: famille },
        { name: "France", link: "france", picture: france },
        { name: "Nature", link: "nature", picture: nature },
        { name: "Photoclub", link: "photoclub", picture: photoclub },
        { name: "Vie Sociale", link: "viesociale", picture: viesociale },
        { name: "Voyages", link: "voyages", picture: voyages }
    ]

    return (
        <div className="albumZones">
            {zones.map((zone) => {
                if (zone.name !== props.zone) {
                    return (
                        <div className="albumZoneItem">
                            <Link to={"/" + zone.link}>
                                <img
                                    className="albumZonePicture"
                                    src={zone.picture}
                                    alt={zone.name}
                                />
                                <p className="subtitle white albumZoneTitle">{zone.name}</p>
                            </Link>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default AlbumZones;