import emailjs from "emailjs-com";
import React from 'react';


const Contact = () => {

  function sendEmail(e) {
    e.preventDefault();
    var x = document.forms["contact_form"]["website"].value;

    if (x == "" || x == null) { // if the honeypot was ignored, it's a hu-mon
      document.getElementById("contactform").submit(); // link to process form and redirect to thank you


      emailjs.sendForm('service_yywk6mo', 'template_30xnqbi', e.target, 'user_FlLAVlddlRiHWB9R1vge7')
        .then((result) => {
          let success = document.getElementById("success");
          console.log(result.text);
          success.style.visibility = "visible";
          setTimeout(() => {
            success.style.visibility = "hidden";
          }, 5000);

        }, (error) => {
          let failure = document.getElementById("failure");
          console.log(error.text);
          failure.style.visibility = "visible";
          setTimeout(() => {
            failure.style.visibility = "hidden";
          }, 5000);
        });
      e.target.reset()

    }

    else { // the honeypot was filled in, it's a robot
      return false;
    }

  }

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

          <button data-sitekey="reCAPTCHA_site_key"
            data-callback='onSubmit'
            data-action='submit'
            className='contactcodeurs' type="submit" value="Send Message">Envoyer</button>

          <p id="success" className="success poppinsRegular">Message envoyé !</p>
          <p id="failure" className="failure poppinsRegular">Une erreur est survenue...</p>

        </form>

      </div>
    </div>
  )
}

export default Contact