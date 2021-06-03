<?php
// files needed to connect to database
include_once '../included_files/config/database.php';
include_once '../included_files/objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate product object
$user = new User($db);

// install the user table
return $user->install();