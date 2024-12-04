<?php
    $servername = "sql205.infinityfree.com"; // Replace with your database server
    $username = "if0_37850282"; // Replace with your database username
    $password = "4oxm7N4BFghQI9U"; // Replace with your database password
    $dbname = "if0_37850282_register"; // Replace with your database name
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>