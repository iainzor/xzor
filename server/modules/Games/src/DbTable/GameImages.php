<?php
namespace Games\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Games\Model\GameImage;

class GameImages extends AbstractTable 
{
	const NAME = "game_images";
	
	public function getName(): string { return self::NAME; }
	
	public function getModelClass() : string { return GameImage::class; }
	
	public function getPrimaryKeys() : array { return ["id"]; }
	
	/**
	 * Load all cover images for the game IDs provided
	 * 
	 * @param int[] $gameIds
	 * @return GameImage[]
	 */
	public function loadCoverImages(array $gameIds) : array
	{
		if (empty($gameIds)) {
			return [];
		}
		
		$idList = array_map([$this->db, "quote"], $gameIds);
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`gameId` IN (". implode(",", $idList) .") AND
					`category` = :category
		");
		$statement->execute([
			":category" => GameImage::CATEGORY_COVER
		]);
		
		return $statement->fetchAll(\PDO::FETCH_CLASS, GameImage::class);
	}
}