<?php
// required headers
include_once '../included_files/config/header_access.php';
 
// required to decode jwt
include_once '../included_files/config/jwt_config.php';
include_once '../included_files/vendor/firebase/php-jwt/src/BeforeValidException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/ExpiredException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/SignatureInvalidException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;
 
/// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";
 
// if jwt is not empty
if($jwt){
 
    // if decode succeed, show user details
    try {
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
 
        // set response code
        http_response_code(200);
 
        // show user details
        echo json_encode(array(
            "message" => "Access granted.",
            "data" => $decoded->data
        ));
 
    }
 
    // if decode fails, it means jwt is invalid
	catch (Exception $e){
	 
	    // set response code
	    http_response_code(401);
	 
	    // tell the user access denied  & show error message
	    echo json_encode(array(
	        "message" => "Access denied.",
	        "error" => $e->getMessage()
	    ));
	}
}
 
// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
?>