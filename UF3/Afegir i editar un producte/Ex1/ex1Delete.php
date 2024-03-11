<?php
    
    $servername = "localhost:4306";
    $username = "root";
    $password = "";
    $dbname = "productos";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $delete_id = mysqli_real_escape_string($conn, $_GET["id"]);

    $sql = "DELETE FROM agregar WHERE id = $delete_id";


    echo $sql;

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: ex1Llistat.php');

?>
