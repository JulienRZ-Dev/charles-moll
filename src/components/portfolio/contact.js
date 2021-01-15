import emailjs from "emailjs-com";
import React from 'react';


const Contact = () => {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_7garnrq', 'template_rg9wh0m', e.target, 'user_VU6xMcyWoQ38ebJK7LVtX')
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

  function onSubmit(token) {
    document.getElementById("contactform").submit();
  }

  return (
    <div id="contact" className='perroquet'>
      {/* <div className="parallax4"></div> */}

      <div className="contactPortfolio">
        <h3 className="contactTitle">Contact</h3>
        <form id="contactform" spellCheck="false" onSubmit={sendEmail}>
          {/* <label for="name">Nom</label> */}
          <input className="contactInput" required type="text" id="name" name="name" placeholder="Nom" />

          {/* <label for="email">Email</label> */}
          <input className="contactInput" required type="text" id="email" name="email" placeholder="Email" />

          {/* <label for="objet">Objet</label> */}
          <input className="contactInput" required type="text" id="objet" name="objet" placeholder="Objet" />

          {/* <label for="message">Message</label> */}
          <textarea required type="text" id="message" name="message" placeholder="Message"></textarea>

          <button data-sitekey="reCAPTCHA_site_key"
                  data-callback='onSubmit'
                  data-action='submit'
                  className='contactcodeurs' type="submit" value="Send Message">Envoyer</button>

          <p id="success" className="success">Message envoyé !</p>
          <p id="failure" className="failure">Une erreur est survenue...</p>

        </form>

      </div>
    </div>
  )
}

export default Contact