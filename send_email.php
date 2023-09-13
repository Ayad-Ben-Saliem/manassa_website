<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Sanitize the data (optional)
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$message = htmlspecialchars($message);

// Set up email parameters
$to = 'info@manassa.ly'; // Replace with your own email address
$subject = 'New message from manassa.ly';
$body = "Name: $name\nEmail: $email\n\n$message";

// Send the email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$mailSent = mail($to, $subject, $body, $headers);

// Check if the email was sent successfully
if ($mailSent) {
    echo 'Email sent successfully. Thank you!';
} else {
    echo 'Email sending failed. Please try again.';
}
?>