<?php
// 'user' object
class User{
 
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
         
    // check if given email exist in the database
    function emailExists(){
     
        // query to check if email exists
        $query = "SELECT id, firstname, lastname, password
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
     
        // prepare the query
        $stmt = $this->conn->prepare( $query );
     
        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));
     
        // bind given email value
        $stmt->bindParam(1, $this->email);
     
        // execute the query
        $stmt->execute();
     
        // get number of rows
        $num = $stmt->rowCount();
     
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
     
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
            // assign values to object properties
            $this->id = $row['id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->password = $row['password'];
     
            // return true because email exists in the database
            return true;
        }
     
        // return false if email does not exist in the database
        return false;
    }
     
    // update a user record
    public function update(){
     
        // if password needs to be updated
        $password_set=!empty($this->password) ? ", password = :password" : "";
     
        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
                SET
                    username = :username,
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    main_color = :main_color
                    {$password_set}
                WHERE id = :id";
     
        // prepare the query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->firstname=htmlspecialchars(strip_tags($this->firstname));
        $this->lastname=htmlspecialchars(strip_tags($this->lastname));
        $this->email=htmlspecialchars(strip_tags($this->email));
     
        // bind the values from the form
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':main_color', $this->main_color);
     
        // hash the password before saving to database
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }
     
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
     
        // execute the query
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }

    // get user row/settings
    public function get_account_settins(){

        $query = "SELECT * FROM ". $this->table_name ." WHERE id = " . $this->id . " LIMIT 0,1" ;
        
        // prepare the query
        $stmt = $this->conn->prepare( $query );

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if account settings exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
     
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
            // assign values to object properties
            $this->id           = $row['id'];
            $this->firstname    = $row['firstname'];
            $this->lastname     = $row['lastname'];
            $this->username     = $row['username'];
            $this->email        = $row['email'];
            $this->main_color   = $row['main_color'];
            $this->created      = $row['created'];
     
            // return true because account setting exists in the database
            return true;
        } else {
            // return false if account setting does not exist in the database
            return false;
        }     
    }

    // install table
    function install(){

        // install query
        $query = "CREATE TABLE users (
            id int NOT NULL AUTO_INCREMENT, 
            username varchar(255) NULL UNIQUE,
            firstname varchar(255) NOT NULL,
            lastname varchar(255) NOT NULL, 
            email varchar(255) NOT NULL UNIQUE, 
            password varchar(255) NOT NULL, 
            main_color varchar(255) NULL,
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