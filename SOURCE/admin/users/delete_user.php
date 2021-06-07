<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost:404");
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
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";
 
// if jwt is not empty
if($jwt){
 
    // if decode succeed, show user details
    try {
 
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
 
        // set user property values
        $user->delete_id = $data->id;
        $user->id = $decoded->data->id; 
        
        if ($decoded->data->user_type  == 'admin'){
		// create the product
            $user->get_account_settins();
            
            $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "exp" => $exp,
            "nbf" => $nbf,
            "data" => array(
                "id" => $user->id,
                "firstname" => $user->firstname,
                "lastname" => $user->lastname,
                "email" => $user->email,
                "user_type" => $user->user_type,
            )
            );
            $jwt = JWT::encode($token, $key);
            
            if($user->delete()){
                // we need to re-generate jwt because user details might be different
                // set response code
                http_response_code(200);
                
                // response in json format
                echo json_encode(
                        array(
                            "message" => "User was deleted.",
                            "jwt" => $jwt,
                        )
                    );
            }
            
            // message if unable to update user
            else{
                // set response code
                http_response_code(401);
                
                // response in json format
                echo json_encode(
                        array(
                            "message" => "Unable to delete user.",
                            "jwt" => $jwt,
                        )
                    );
            
            }
        }  else {

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
	 
	    // show error message
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