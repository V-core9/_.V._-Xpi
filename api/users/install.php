<?php
//Block direct access to file
if ( ! defined( 'OMEGA_LOC' ) ) exit;

function installUsers(){
    // Create connection
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    // sql to create table
    $sql = "CREATE TABLE users (
		id int NOT NULL AUTO_INCREMENT, 
        username varchar(255) NOT NULL UNIQUE,
		firstname varchar(255) NOT NULL,
		lastname varchar(255) NOT NULL, 
		email varchar(255) NOT NULL UNIQUE, 
		password varchar(255) NOT NULL, 
        main_color varchar(255) NULL,
		created datetime  DEFAULT CURRENT_TIMESTAMP NOT NULL, 
		modified timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
		PRIMARY KEY (id)
	)";

    if ($conn->query($sql) === TRUE) {
        return "<div class='install-message success'>Table users created successfully</div>";
    } else {
        return "<div class='install-message error'>Error creating table: " . $conn->error . "</div>";
    }

    $conn->close();
}
?>