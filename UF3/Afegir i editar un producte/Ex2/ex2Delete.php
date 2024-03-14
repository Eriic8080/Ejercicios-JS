<?php
    
    $servername = "localhost:4306";
    $username = "root";
    $password = "";
    $dbname = "productos";

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
        
    if(isset($_POST["id"]) && !empty($_POST["id"])){

        $id = $_POST["id"];

        $sql = "DELETE FROM agregar WHERE id=" . $id;

        if ($conn->query($sql) === TRUE) {
            // Si se borra correctamente devuelve un JSON con un TRUE de la operacio y un mensaje de Registro eliminado 
            echo json_encode(array("consulta" => true, "mensaje" => "Registro eliminado correctamente"));
        } else {
            // Si hubo un error y no se borro devuelve un JSON con el error y un FALSE indicando que no borro del servidor
            echo json_encode(array("consulta" => false, "mensaje" => "Error al eliminar el registro: " . $conn->error));
        }

        $conn->close();

    } 
    

?>
