emailjs.init('USER_ID'); 

(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault(); 
  

      let thisForm = this;

      // Show loading animation
      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.error-message').style.display = 'none';
      thisForm.querySelector('.sent-message').style.display = 'none';

      // Collect form data
      let formData = {
        name: thisForm.querySelector('input[name="name"]').value,
        email: thisForm.querySelector('input[name="email"]').value,
        subject: thisForm.querySelector('input[name="subject"]').value,
        message: thisForm.querySelector('textarea[name="message"]').value
      };

      // Send email via EmailJS
      emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData)
      .then((response) => {
        thisForm.querySelector('.loading').style.display = 'none';
        thisForm.querySelector('.sent-message').style.display = 'block';
        thisForm.reset(); // Reset form after successful submission
      }, (error) => {
        thisForm.querySelector('.loading').style.display = 'none';
        displayError(thisForm, 'Form submission failed! ' + error);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').style.display = 'none';
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').style.display = 'block';
  }

})();
