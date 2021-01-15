import React from 'react';

import pepe from '../../assets/images/pepedetour.png';

const Bio = () => {
  return (
    <div className="bioOver">
      <div id="bio" className='bio'>
        <div className="parallax21"></div>
        <div className="parallax22"></div>
        <div className="textbio">
          <p className="paragraphe">“ Des photos comme des traces de vie, de rencontres, de culture. Seuls les souvenirs restents vivants. Est-ce vrai pour les photos ? “ <br></br><br></br>Bonne visite <br></br><br></br>Charles Moll</p>
        </div>
        <img className="pepe" src={pepe} alt="charles moll"></img>
      </div>
    </div>
  )
}

export default Bio