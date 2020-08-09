<?php
// used to get mysql database connection
class Database{

	// specify your own database credentials
	private $host = "localhost";
	private $db_name = "login_testing_jwt";
	private $username = "login_testing_jwt";
	private $password = "login_testing_jwt";
	public $con;

	// get the database connection
	public function getConnection(){

		$this->conn = null;

		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
		}catch(PDOException $excception){
			echo "Connection error: " . $exception->getMessage();
		}

		return $this->conn;
	}
}