<?php
namespace Games\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Database\PDO,
	Games\Game;

class Games extends AbstractTable
{
	const NAME = "games";
	
	public function getName() : string { return self::NAME; }
	
	/**
	 * Find all games matching a search string
	 * 
	 * @param string $search
	 * @return Game[]
	 */
	public function findAll(string $search = null) : array 
	{
		$statement = $this->db->prepare("
			SELECT * 
			FROM `games` 
			WHERE `title` LIKE :search
			LIMIT 24
		");
		$statement->execute([
			":search" => "%". $search ."%"
		]);
		
		return $statement->fetchAll(PDO::FETCH_CLASS, Game::class);
	}
	
	/**
	 * Find a single game using its slug
	 * 
	 * @param string $slug
	 * @return Game
	 * @throws \Exception
	 */
	public function find(string $slug) : Game
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
		$row = $statement->fetchObject(Game::class);
		
		if (!$row) {
			throw new \Exception("Could not find game '{$slug}'");
		}
		
		return $row;
	}
	
	public function giantBombGameExists(int $giantBombId) : bool
	{
		$statement = $this->db->prepare("SELECT `id` FROM `games` WHERE `giantBombId` = :id");
		$statement->execute([
			":id" => $giantBombId
		]);
		
		return $statement->fetch() ? true : false;
	}
}