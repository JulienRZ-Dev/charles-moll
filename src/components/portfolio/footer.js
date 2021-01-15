import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

const Footer = (props) => {

  function contactJulien() {
    window.location.href = "mailto:rz.web.development@gmail.com";
  }
  function contactRobin() {
    window.location.href = "mailto:robin.bonhoure@outlook.fr";
  }

  return (
    <div className={props.shouldHaveMargin ? 'footer' : 'footer footerWhitoutMargin'}>
      <div className="flexcontainer">
        <div className='menufooter'>
          <h4 className="footertitle title4">Menu</h4>
          <a href="#slider" className="poppins18">Portfolio</a>

          <div className="compose poppins18">
            <div className="first">
              <Link to={"/animaux"}>Animaux</Link>
              <Link to={"/famille"}>Famille</Link>
              <Link to={"/art"}>Art</Link>
            </div>
            <div className="second">
              <Link to={"/nature"}>Nature</Link>
              <Link to={"/voyages"}>Voyages</Link>
              <Link to={"/viesociale"}>Vie sociale</Link>
            </div>
            <div className="third">
              <Link to={"/France"}>France</Link>
              <Link to={"/photoclub"}>Photoclub</Link>
              <Link to={"/avion"}>Aviation</Link>
            </div>
          </div>

          <a href="#bio" className="poppins18">Qui suis-je</a>
          <a href="#contact" className="poppins18">Contact</a>
        </div>
        <div className='codeursfooter'>
          <h4 className="footertitle title4">Créateurs du site</h4>
          <a className="poppins18">Frontend & backend <br></br> Julien Rouzot</a>
          <button onClick={() => contactJulien()} className='contactcodeurs'>Contacter</button>
          <a className="poppins18">Design & frontend <br></br> Robin Bonhoure</a>
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