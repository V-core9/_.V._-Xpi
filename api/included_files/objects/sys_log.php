<?php
// 'sys_log' object
class SysLog{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $username;
    public $main_color;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
     
    // create new user record
    function create(){

        if(empty($this->firstname) || 
        empty($this->lastname) ||
        empty($this->email) ||
        empty($this->firstname) ||
        empty($this->password)) {
            return false;
        }
     
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    password = :password";
     
        // prepare the query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->firstname=htmlspecialchars(strip_tags($this->firstname));
        $this->lastname=htmlspecialchars(strip_tags($this->lastname));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
     
        // bind the values
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
     
        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
     
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }

    // install table
    function install(){

        // install query
        $query = "CREATE TABLE sys_log (
            id bigint NOT NULL AUTO_INCREMENT, 
            username varchar(255) NULL UNIQUE,
            firstname varchar(255) NOT NULL,
            lastname varchar(255) NOT NULL, 
            email varchar(255) NOT NULL UNIQUE, 
            password varchar(255) NOT NULL, 
            main_color varchar(255) NULL,
            user_type varchar(255) NULL,
            created datetime  DEFAULT CURRENT_TIMESTAMP NOT NULL, 
            modified timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        )";
     
        // prepare the query
        $stmt = $this->conn->prepare($query);
     
        
        // execute the query, also check if query has any errors
        if (!$stmt->execute()) {
            return json_encode(array("message" => "Failed to install Users Module.", "errorData" => ($stmt->errorInfo())));
        } else {
            return json_encode(array("message" => "Users Module install successful."));
        }        
    }

}