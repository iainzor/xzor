<?php
namespace Games\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Games\Model\GameTheme;

class GameThemes extends AbstractTable 
{
	const NAME = "game_themes";
	
	public function getName(): string { return self::NAME; }
	
	public function getModelClass() : string { return GameTheme::class; }
	
	public function loadGameThemes(array $gameIds) : array
	{
		if (empty($gameIds)) {
			return [];
		}
		
		$ids = array_map([$this->db, "quote"], $gameIds);
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`gameId` IN (". implode(",", $ids) .")
		");
		$statement->execute();
		
		return $statement->fetchAll(\PDO::FETCH_CLASS, GameTheme::class);
	}
}