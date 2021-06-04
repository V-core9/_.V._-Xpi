<?php
// used to get mysql database connection
class Database{

	// specify your own database credentials
	private $host = "DemoName_mysql:3306";
	private $db_name = "xomdb";
	private $username = "root";
	private $password = "password";
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