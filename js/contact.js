/* =========================================================================
   js/contact.js
   -------------------------------------------------------------------------
   PURPOSE: ALL logic for the contact form on contact.html lives here:
     1. Validate each field as the user types/leaves a field (blur)
     2. Validate everything again on submit, blocking submission if
        anything is invalid
     3. Simulate sending the form (this is a learning project with no
        real backend) by showing a loading state, then a success message

   This file does nothing unless a <form id="contact-form"> exists on
   the page, so it's safe to include on every page even though only
   contact.html actually uses it.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');

  if (!form) {
    return; // We're not on contact.html - nothing to do.
  }

  var nameInput = form.querySelector('#name');
  var emailInput = form.querySelector('#email');
  var subjectInput = form.querySelector('#subject');
  var messageInput = form.querySelector('#message');
  var submitButton = form.querySelector('button[type="submit"]');
  var successBanner = document.getElementById('form-success');

  /* -----------------------------------------------------------------
     VALIDATION RULES
     Each rule receives the field's current value and returns an error
     message string if invalid, or an empty string if the value is fine.
     Keeping rules as small functions makes it easy to add new fields
     later without rewriting the whole validation flow.
     ----------------------------------------------------------------- */
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName(value) {
    if (value.trim().length === 0) {
      return 'Please enter your name.';
    }
    if (value.trim().length < 2) {
      return 'Name must be at least 2 characters.';
    }
    return '';
  }

  function validateEmail(value) {
    if (value.trim().length === 0) {
      return 'Please enter your email address.';
    }
    if (!EMAIL_PATTERN.test(value.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  function validateSubject(value) {
    if (value.trim().length === 0) {
      return 'Please choose a subject.';
    }
    return '';
  }

  function validateMessage(value) {
    if (value.trim().length === 0) {
      return 'Please enter a message.';
    }
    if (value.trim().length < 10) {
      return 'Message should be at least 10 characters so we have enough context.';
    }
    return '';
  }

  /* -----------------------------------------------------------------
     Shows or clears an error message under a given field, and toggles
     the ".is-invalid" class so the input border turns red (see style.css).
     ----------------------------------------------------------------- */
  function setFieldError(inputEl, message) {
    var errorEl = document.getElementById(inputEl.id + '-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
    if (message) {
      inputEl.classList.add('is-invalid');
    } else {
      inputEl.classList.remove('is-invalid');
    }
  }

  /* Runs the right validator for one field and updates its error message.
     Returns true if the field is valid. */
  function validateField(inputEl) {
    var value = inputEl.value;
    var error = '';

    switch (inputEl.id) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'subject':
        error = validateSubject(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }

    setFieldError(inputEl, error);
    return error === '';
  }

  // Validate each field as soon as the user leaves it (on "blur"),
  // so people get feedback before they even try to submit.
  [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
    if (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
    }
  });

  /* -----------------------------------------------------------------
     FORM SUBMISSION
     ----------------------------------------------------------------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the browser's default full-page reload.

    var isNameValid = validateField(nameInput);
    var isEmailValid = validateField(emailInput);
    var isSubjectValid = validateField(subjectInput);
    var isMessageValid = validateField(messageInput);

    var formIsValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (!formIsValid) {
      // Move focus to the first invalid field so keyboard/screen-reader
      // users immediately land where they need to make a correction.
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    simulateFormSubmission();
  });

  /* -----------------------------------------------------------------
     Since this is a front-end-only learning project, there's no real
     server to send data to. This function fakes a network request with
     a short delay so you can see what a real "loading -> success" flow
     would look like, using setTimeout in place of a fetch() call.
     ----------------------------------------------------------------- */
  function simulateFormSubmission() {
    submitButton.classList.add('btn-loading');
    submitButton.disabled = true;

    window.setTimeout(function () {
      submitButton.classList.remove('btn-loading');
      submitButton.disabled = false;

      form.reset();

      if (successBanner) {
        successBanner.hidden = false;
        successBanner.classList.add('slide-down');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1200);
  }
});
