<?php
namespace Games;

class GameImageLoader
{
	/**
	 * @var DbTable\GameImages
	 */
	private $images;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\GameImages $images
	 */
	public function __construct(DbTable\GameImages $images)
	{
		$this->images = $images;
	}
	
	/**
	 * Attach cover images to each game provided
	 * 
	 * @param Model\Game[] $games
	 */
	public function attachCoverImages(array $games)
	{
		$gameIds = [];
		foreach ($games as $game) {
			$gameIds[$game->id] = $game;
		}
		
		$images = $this->images->loadCoverImages(array_keys($gameIds));
		foreach ($images as $image) {
			$game = $gameIds[$image->gameId];
			$game->coverImage = $image->url;
		}
	}
}