<?php
// Database configuration
$host = 'localhost';
$db = 'helpdesk';
$user = 'root'; // Change this to your database username
$pass = ''; // Change this to your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$issue = $_POST['issue'];
$email = $_POST['email'];
$rating = $_POST['rating'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO feedback (issue, email, rating) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $issue, $email, $rating);

// Execute the statement
if ($stmt->execute()) {
    echo "Feedback submitted successfully.";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>
