<?php
// used to get mysql database connection
class Database{

	// specify your own database credentials
	private $host = "[>DB_HOST<]";
	private $db_name = "[>DB_NAME<]";
	private $username = "[>DB_USER<]";
	private $password = "[>DB_PASS<]";
	public $conn;

	// get the database connection
	public function getConnection(){

		$this->conn = null;

		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
		}catch(\DOException $e){
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}

		return $this->conn;
	}
}