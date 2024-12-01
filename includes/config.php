<?php
session_start();

// Check if user_id is set
if (!isset($_SESSION['user_id'])) {
    die("Error: User is not logged in.");
}

$userId = $_SESSION['user_id'];

// Use $userId for your logic, such as database queries
?>