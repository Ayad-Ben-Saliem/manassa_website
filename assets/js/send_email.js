// Function to manually submit the form via AJAX
function submitForm() {
  // Gather form data
  var formData = new FormData(document.getElementById("sendMessageForm"));

  var name = formData.get("name");
  var email = formData.get("email");
  var message = formData.get("message");

  console.log("name: ", name);
  console.log("email: ", email);
  console.log("message: ", message);

  name = name.trim();
  email = email.trim();
  message = message.trim();

  var requiredFields = [];
  if (name.length == 0) requiredFields.push("name");
  if (email.length == 0) requiredFields.push("email");
  if (message.length == 0) requiredFields.push("message");

  if (requiredFields.length > 0) {
    var msg = requiredFields[0];
    if (requiredFields.length == 2) msg += " and " + requiredFields[1];
    if (requiredFields.length == 3)
      msg += ", " + requiredFields[1] + " and " + requiredFields[2];
    if (requiredFields.length == 1) msg += " is required";
    else msg += " are required";
  }

  if (email.length != 0 && !validateEmail(email)) {
    if (msg == undefined) msg = "";
    else msg += "</br>";
    msg += "Your email (" + email + ") is invalid";
  }

  if (msg != undefined) {
    // msg += '</div>';
    return displayDialog(msg);
  }

  // Send AJAX request to the server-side script
  fetch("send_email.php", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        return response.text(); // Return response text if successful
      } else {
        throw new Error("Email sending failed."); // Throw an error if request failed
      }
    })
    .then(function (responseText) {
      // Handle successful response
      displayDialog(responseText); // Call the function to display the response in the dialog
    })
    .catch(function (error) {
      // Handle error
      displayDialog("Error !!");
      console.error(error);
    });
}

/**
 * @param {string} email Email of sender
 */
function validateEmail(email) {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|.('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// Function to display the response message in a dialog
function displayDialog(message) {
  document.getElementById("messageParagraph").innerHTML = message;
  document.getElementById("dialogContainer").style.display = "block";
  setTimeout(
    () => (document.getElementById("dialogContainer").style.display = ""),
    5000
  );
}

function dismissDialog() {
  document.getElementById("dialogContainer").style.display = "";
}
