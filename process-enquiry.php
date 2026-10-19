<?php
// Enable error reporting for debugging
error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Honeypot Spam Check (If hidden field is filled, it's a bot)
    if (!empty($_POST['_honey'])) {
        header("Location: contact.html?status=success");
        exit();
    }

    // 2. Sanitize and Validate Inputs
    $to       = "info@universalpowertechengineering.com";
    $subject  = "New Website Project Enquiry - Universal PowerTech Engineering";
    
    $name     = strip_tags(trim($_POST["name"] ?? ''));
    $email    = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone    = strip_tags(trim($_POST["phone"] ?? ''));
    $interest = strip_tags(trim($_POST["interest"] ?? ''));
    $message  = htmlspecialchars(trim($_POST["message"] ?? ''), ENT_QUOTES, 'UTF-8');

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($interest) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?status=error");
        exit();
    }

    // 3. Build Email Body
    $email_content  = "New Project Enquiry Received:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Work Email: $email\n";
    $email_content .= "Phone Number: $phone\n";
    $email_content .= "Selected Solution/Partner: $interest\n\n";
    $email_content .= "Requirement Details:\n$message\n";

    // 4. Build Email Headers (Using info@ as sender so cPanel accepts it instantly)
    $headers  = "From: info@universalpowertechengineering.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Send Email
    if (mail($to, $subject, $email_content, $headers)) {
        header("Location: contact.html?status=success");
        exit();
    } else {
        header("Location: contact.html?status=error");
        exit();
    }
} else {
    header("Location: contact.html");
    exit();
}
?>