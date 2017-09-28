<?php
namespace Games;

use Account\Account;

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
	 * @var Account
	 */
	private $account;
	
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * @var DbTable\GameManagers
	 */
	private $managersTable;
	
	/**
	 * @var \Games\GameImageSaver
	 */
	private $imageSaver;
	
	/**
	 * @var \Games\GameThemeSaver
	 */
	private $themeSaver;	
	
	/**
	 * @var int
	 */
	private $gameId;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\Account $account
	 * @param \Games\DbTable\Games $gamesTable
	 * $param \Games\DbTable\GameManagers $managersTable
	 * @param \Games\GameImageSaver $imageSaver
	 * @param \Games\GameThemeSaver $themeSaver
	 */
	public function __construct(Account $account, DbTable\Games $gamesTable, DbTable\GameManagers $managersTable, GameImageSaver $imageSaver, GameThemeSaver $themeSaver)
	{
		$this->account = $account;
		$this->gamesTable = $gamesTable;
		$this->managersTable = $managersTable;
		$this->imageSaver = $imageSaver;
		$this->themeSaver = $themeSaver;
	}
	
	/**
	 * Set the ID of the game being saved.  Without an ID, it is assumed a new
	 * game is being created.
	 * 
	 * @param int $id
	 */
	public function setGameId(int $id)
	{
		$this->gameId = $id;
	}
	
	/**
	 * @param array $data
	 * @param int $gameId
	 * @return \Games\GameSaver
	 */
	public function save(array $data) : GameSaver
	{
		if ($this->isValid($data)) {
			$isNew = !$this->game->id;
			
			$this->gamesTable->save($this->game);
			
			if (!$this->game->id) {
				$this->isValid = false;
				$this->errors["general"] = "Could not import game";
			} else {
				$this->process($isNew);
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
		$this->game->id = $this->gameId;
		
		if (empty($this->game->title)) {
			$this->errors["title"] = "Please provide a title for the game";
		}
		if (empty($this->game->slug)) {
			$this->errors["slug"] = "Please provide a path for the game";
		} else { 
			if (preg_match("/[^a-z0-9-_]+/i", $this->game->slug)) {
				$this->errors["slug"] = "The path provided has invalid characters";
			} else if ($this->gamesTable->isSlug($this->game->slug, $this->gameId)) {
				$this->errors["slug"] = "The path provided already exists";
			}
		}
		
		$this->isValid = empty($this->errors);
		
		return $this->isValid;
	}
	
	private function process(bool $isNew = false)
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
		
		if ($isNew) {
			$this->managersTable->insert([
				"gameId" => $this->game->id,
				"accountId" => $this->account->id,
				"role" => "admin"
			], ["role"]);
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
