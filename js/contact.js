function submitForm(event) {
  event.preventDefault();
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var subjectInput = document.getElementById('title');
  var messageInput = document.getElementById('message');

  // Validate form inputs
  if (nameInput.value.length < 3) {
    displayError('name', 'Name must be at least 3 characters long.'); /* Thats becaue my name is three letters. */
    return;
  }

  if (!isValidEmail(emailInput.value)) {
    displayError('email', 'Please enter a valid email address.');
    return;
  }

  if (subjectInput.value.length < 5) {
    displayError('title', 'Subject must be at least 5 characters long.');
    return;
  }

  if (messageInput.value.length < 25) {
    displayError('message', 'Message must be at least 25 characters long.');
    return;
  }

  // Create the form data object
  var formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('subject', subjectInput.value);
  formData.append('message', messageInput.value);

  // Send the form data to the API endpoint
  fetch('https://examone.techlilja.io/wp-json/contact-form-7/v1/contact-forms/99/feedback', {
    method: 'POST',
    body: formData
  })
    .then(function(response) {
      // Handle response from the server
      if (response.ok) {
        // Form submission successful
        alert('Form submitted successfully!');
        // Reset the form
        document.getElementById('contact-form').reset();
        // Provide confirmation message
        showConfirmationMessage();
      } else {
        // Form submission failed
        alert('Form submission failed. Please try again.');
      }
    })
    .catch(function(error) {
      // Handle error
      console.error(error);
      alert('An error occurred. Please try again later.');
    });
}

function isValidEmail(email) {
  var emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}


function showConfirmationMessage() {
  // Create a confirmation element
  var confirmationElement = document.createElement('p');
  confirmationElement.textContent = 'Thank you for contacting us. Your message has been sent successfully.';
  
  // Append the confirmation element to the container
  var container = document.getElementById('container-confirmation');
  container.innerHTML = ''; // Clear any existing content in the container
  container.appendChild(confirmationElement);
}
