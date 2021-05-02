import emailjs from "emailjs-com";
import React from 'react';


const Contact = () => {

  function sendEmail(event) {
    event.preventDefault();
    var x = document.getElementById("website").value;
    console.log(x);
    if (x == "" || x == null) { // if the honeypot was ignored, it's a hu-mon
      emailjs.sendForm('service_yywk6mo', 'template_30xnqbi', event.target, 'user_FlLAVlddlRiHWB9R1vge7')
        .then(function () {
          console.log('SUCCESS!');
          let success = document.getElementById("success");
          event.target.reset();
          success.style.visibility = "visible";
          setTimeout(() => {
            success.style.visibility = "hidden";
          }, 5000);
        }, function (error) {
          let failure = document.getElementById("failure");
          event.target.reset();
          console.log(error.text);
          failure.style.visibility = "visible";
          setTimeout(() => {
            failure.style.visibility = "hidden";
          }, 5000);
          console.log('FAILED...', error);
        });
    } else { // the honeypot was filled in, it's a robot
      console.log("robot");
      return false;
    }
  };

  return (
    <div id="contact" className='perroquet'>

      <div className="contactPortfolio">
        <form name="contact-form" id="contactform" spellCheck="false" onSubmit={sendEmail}>
          <h3 className="contactTitle title3">Contact</h3>
          {/* <label for="name">Nom</label> */}
          <input className="contactInput" required type="text" id="name" name="name" placeholder="Nom" />

          {/* <label for="email">Email</label> */}
          <input className="contactInput" required type="text" id="email" name="email" placeholder="Email" />

          {/* HONEYPOT */}
          <input id="website" name="website" type="text" />

          {/* <label for="objet">Objet</label> */}
          <input className="contactInput" required type="text" id="objet" name="objet" placeholder="Objet" />

          {/* <label for="message">Message</label> */}
          <textarea style={{ resize: "none" }} required type="text" id="message" name="message" placeholder="Message"></textarea>

          <div class="divSendButton"> 
            <button className='contactcodeurs' type="submit" value="Send">Envoyer</button>
          </div>

          <p id="success" className="success poppinsRegular">Message envoyé !</p>
          <p id="failure" className="failure poppinsRegular">Une erreur est survenue...</p>

        </form>

      </div>
    </div>
  )
}

export default Contact