<?php
// required headers
include_once '../included_files/helpers/doc_header.help.php';
set_doc_header();
 
// required to decode jwt
include_once '../included_files/config/jwt_config.php';
include_once '../included_files/vendor/firebase/php-jwt/src/BeforeValidException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/ExpiredException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/SignatureInvalidException.php';
include_once '../included_files/vendor/firebase/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../included_files/config/database.php';
include_once '../included_files/objects/user.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);

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

		$user->id = $decoded->data->id;
 
        if ($user->get_account_settins()){
            // set response code
            http_response_code(200);
            
            // show user details
            echo json_encode(array(
                "message" => "Access granted.",
                "data" => $user
            ));
        } else {
            // set response code
            http_response_code(404);

            // show user details
            echo json_encode(array(
                "message" => "Missing Account Settings."
            ));
        }
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