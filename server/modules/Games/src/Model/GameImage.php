<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class GameImage extends AbstractModel
{
	const CATEGORY_COVER = "cover";
	
	/**
	 * @var int
	 */
	public $id = 0;
	
	/**
	 * @var int
	 */
	public $gameId = 0;
	
	/**
	 * @var string
	 */
	public $category;
	
	/**
	 * @var string
	 */
	public $url;
	
	public function getPrimaryKeys() : array { return ["id"]; }
	
	/**
	 * Get or set the image's ID
	 * 
	 * @param int $id
	 * @return int
	 */
	public function id(int $id = null) : int
	{
		if ($id !== null) {
			$this->id = $id;
		}
		return $this->id;
	}
	
	/**
	 * Get or set the ID of the game the image belongs to
	 * 
	 * @param int $gameId
	 * @return int
	 */
	public function gameId(int $gameId = null) : int
	{
		if ($gameId !== null) {
			$this->gameId = $gameId;
		}
		return $this->gameId;
	}
}
