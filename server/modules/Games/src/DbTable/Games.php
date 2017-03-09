<?php
namespace Games\DbTable;

use Xzor\PDO;

class Games
{
	/**
	 * @var PDO
	 */
	private $db;
	
	/**
	 * Constructor
	 * 
	 * @param PDO $db
	 */
	public function __construct(PDO $db)
	{
		$this->db = $db;
	}
	
	public function findAll(string $search = null) : array 
	{
		$statement = $this->db->prepare("
			SELECT * 
			FROM `games` 
			WHERE `title` LIKE :search
		");
		$statement->execute([
			":search" => "%". $search ."%"
		]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function find(string $slug) : array
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`games`
			WHERE	`slug` = :slug
			LIMIT	1
		");
		$statement->execute([
			":slug" => $slug
		]);
		$row = $statement->fetch(PDO::FETCH_ASSOC);
		
		if (!$row) {
			throw new \Exception("Could not find game '{$slug}'");
		}
		
		return $row;
	}
}