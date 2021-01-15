import React from 'react'

const Codeurs = () => {

  function contactJulien() {
    window.location.href = "mailto:rz.web.development@gmail.com";
  }
  function contactRobin() {
    window.location.href = "mailto:robin.bonhoure@outlook.fr";
  }

  return (
    <div className='codeurs'>
    <div className='robin'>
        <p className="poppinsRegular black">Design & frontend <br></br> Robin Bonhoure</p>
        <button onClick={() => contactRobin()} className='contactcodeurs'>Contacter</button>
    </div>
        <h3 className="title3">Créateurs du site</h3>
    <div className='julien'>
        <p className="poppinsRegular black">Frontend & Backend <br></br> Julien Rouzot</p>
        <button onClick={() => contactJulien()} className='contactcodeurs'>Contacter</button>
    </div>
    
    </div>

  )
}

export default Codeurs