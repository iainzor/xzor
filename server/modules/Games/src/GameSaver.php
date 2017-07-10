<?php
namespace Games;

class GameSaver implements \JsonSerializable
{
	use \Common\ToArrayTrait;
	
	public $isValid = true;
	public $errors = [];
	
	/**
	 * @var Model\Game
	 */
	public $game;
	
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * @var \Games\GameImageSaver
	 */
	private $imageSaver;
	
	/**
	 * @var \Games\GameThemeSaver
	 */
	private $themeSaver;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\Games $gamesTable
	 * @param \Games\GameImageSaver $imageSaver
	 * @param \Games\GameThemeSaver $themeSaver
	 */
	public function __construct(DbTable\Games $gamesTable, GameImageSaver $imageSaver, GameThemeSaver $themeSaver)
	{
		$this->gamesTable = $gamesTable;
		$this->imageSaver = $imageSaver;
		$this->themeSaver = $themeSaver;
	}
	
	/**
	 * @param array $data
	 * @return \Games\GameSaver
	 */
	public function save(array $data) : GameSaver
	{
		if ($this->isValid($data)) {
			$this->gamesTable->save($this->game);
			
			if (!$this->game->id) {
				$this->isValid = false;
				$this->errors["general"] = "Could not import game";
			} else {
				$this->process();
			}
		}
		
		return $this;
	}
	
	/**
	 * @param array $data
	 * @return bool
	 */
	public function isValid(array $data) : bool 
	{
		$this->game = new Model\Game($data);
		
		if (empty($this->game->title)) {
			$this->errors["title"] = "Please provide a title for the game";
		}
		if (empty($this->game->slug)) {
			$this->errors["slug"] = "Please provide a path for the game";
		} else { 
			if (preg_match("/[^a-z0-9-_]+/i", $this->game->slug)) {
				$this->errors["slug"] = "The path provided has invalid characters";
			} else if ($this->gamesTable->isSlug($this->game->slug)) {
				$this->errors["slug"] = "The path provided already exists";
			}
		}
		
		$this->isValid = empty($this->errors);
		
		return $this->isValid;
	}
	
	private function process()
	{
		if ($this->game->coverImage) {
			$image = new Model\GameImage();
			$image->gameId($this->game->id);
			$image->category = Model\GameImage::CATEGORY_COVER;
			$image->url = $this->game->coverImage;

			$this->imageSaver->save($image);
		}
		
		if (isset($this->game->theme)) {
			$theme = $this->game->theme;
			$theme->gameId = (int) $this->game->id;
			
			$this->themeSaver->save($theme);
		}
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() : array
	{
		return $this->toArray();
	}
}
