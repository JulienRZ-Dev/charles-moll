import React, { useState } from 'react';

import focal from '../../assets/images/focalwhite.svg';

function Navbar() {
  const [navbar, setNavbar] = useState(false);


  const changeBack = () => {
    if (window.scrollY >= 50) {
      setNavbar(true)
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBack);

  return (
    <nav className={navbar ? 'navbar active' : 'navbar'} id='nav'>
      <ul className="menuComputer">
        <img className="focal menuComputer" src={focal} alt="logo charles moll"></img>
        <li><a href="#slider">Portfolio</a></li>
        <li><a href="#bio">Qui suis-je</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}



export default Navbar