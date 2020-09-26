<?php
// used to get mysql database connection
class Database{

	// specify your own database credentials
	private $host = "mysql:3306";
	private $db_name = "test_db";
	private $username = "test";
	private $password = "test";
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