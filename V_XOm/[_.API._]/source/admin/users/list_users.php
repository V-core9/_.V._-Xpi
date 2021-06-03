<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// required to decode jwt
include_once '../../included_files/config/jwt_config.php';
include_once '../../included_files/vendor/firebase/php-jwt/src/BeforeValidException.php';
include_once '../../included_files/vendor/firebase/php-jwt/src/ExpiredException.php';
include_once '../../included_files/vendor/firebase/php-jwt/src/SignatureInvalidException.php';
include_once '../../included_files/vendor/firebase/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../../included_files/config/database.php';
include_once '../../included_files/objects/user.php';
  
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
        
        if ($decoded->data->user_type  == 'admin'){
            
            $perPage = (isset($_COOKIE['perPage']) && is_numeric($_COOKIE['perPage'])) ? $_COOKIE['perPage'] : '50';
            $currentPage = (isset($_COOKIE['currentPage']) && is_numeric($_COOKIE['currentPage'])) ? $_COOKIE['currentPage'] : '1';

            if ($user->get_admin_list_users($perPage, $currentPage)){
                // set response code
                http_response_code(200);
                
                // show user details
                echo json_encode(array(
                    "message" => "Access granted.",
                    "data" => $user->user_list
                ));
            } else {
                // set response code
                http_response_code(404);
    
                // show user details
                echo json_encode(array(
                    "message" => "Missing Account Settings."
                ));
            }

        } else {

            // set response code
            http_response_code(401);
        
            // tell the user access denied  & show error message
            echo json_encode(array(
                "message" => "Access denied. Missing right permissions.",
                "error" => "not-admin"
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