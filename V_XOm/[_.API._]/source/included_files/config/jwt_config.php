<?php
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Europe/Zagreb');
 
// variables used for jwt
$key = "iwqAsWaJ0i7gkzSGe1Bo8JLYJDvkA_MGgy81P9B2Ykc";
$iss = "http://localhost:8080/";
$aud = "http://localhost:8080/";

$iat = time();
$exp = ($iat + 600);
$nbf = $iat;
?>