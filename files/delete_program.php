<?php
session_start();

// if (!isset($_SESSION['user_id'])) {
//     header("Location: ./login.php");
//     exit();
// }

$userId = $_SESSION['user_id'];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "register";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user ID is provided
if (isset($_POST['userId'])) {
    $userId = $_POST['userId'];

    // Start transaction
    $conn->begin_transaction();

    try {
        // Delete workouts associated with the user
        $sql = "DELETE FROM workouts WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->close();

        // Delete the program associated with the user
        $sql = "DELETE FROM program WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->close();

        // Commit transaction
        $conn->commit();

        echo json_encode(['success' => true, 'message' => 'Program and workouts deleted successfully']);
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error deleting program and workouts: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User ID not provided']);
}

$conn->close();
?>