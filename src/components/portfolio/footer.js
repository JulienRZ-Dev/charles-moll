import React from 'react';

import logo from '../../assets/images/logo.png';

const Footer = () => {

  function contactJulien() {
    window.location.href = "mailto:rz.web.development@gmail.com";
  }
  function contactRobin() {
    window.location.href = "mailto:robin.bonhoure@outlook.fr";
  }

  return (
    <div data-scroll-section className='footer'>
      <div className="flexcontainer">
        <div className='menufooter'>
          <h4 className="footertitle">Menu</h4>
          <a href="#slider">Portfolio</a>

          <div className="compose">
            <div className="first">
              <a href="#">Animaux</a>
              <a href="#">Famille</a>
              <a href="#">Art</a>
            </div>
            <div className="second">
              <a href="#">Nature</a>
              <a href="#">Voyages</a>
              <a href="#">Vie sociale</a>
            </div>
            <div className="third">
              <a href="#">France</a>
              <a href="#">Photoclub</a>
              <a href="#">Avion</a>
            </div>
          </div>

          <a href="#bio">Qui suis-je</a>
          <a href="#contact">Contact</a>
        </div>
        <div className='codeursfooter'>
          <h4 className="footertitle">Créateurs du site</h4>
          <a>Frontend & backend <br></br> Julien Rouzot</a>
          <button onClick={() => contactJulien()} className='contactcodeurs'>Contacter</button>
          <a>Design & frontend <br></br> Robin Bonhoure</a>
          <button onClick={() => contactRobin()} className='contactcodeurs'>Contacter</button>
        </div>
        <div className='logofooter'>
          <img src={logo} alt="logo charles moll"></img>
        </div>
      </div>
    </div>
  )
}

export default Footer