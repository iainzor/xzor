<?php
namespace Games\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Database\PDO,
	Games\Model\Game;

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
	
	/**
	 * Check if a slug has already been registered
	 * 
	 * @param string $slug
	 * @return bool
	 */
	public function isSlug(string $slug) : bool 
	{
		$statement = $this->db->prepare("
			SELECT	COUNT(*)
			FROM	`games`
			WHERE	`slug` = :slug
		");
		$statement->execute([
			":slug" => $slug
		]);
		return (int) $statement->fetchColumn() > 0;
	}
	
	/**
	 * Update or insert a game record
	 * 
	 * @param Game $game
	 * @return Game
	 */
	public function save(Game $game) : Game
	{
		$data = [
			"slug" => $game->slug,
			"title" => $game->title,
			"description" => $game->description,
			"sourceName" => $game->sourceName,
			"sourceId" => $game->sourceId
		];
		
		if ($game->id) {
			$this->update($data, [
				"id" => $game->id
			]);
		} else {
			$game->id = $this->insert($data);
		}
		
		return $game;
	}
}