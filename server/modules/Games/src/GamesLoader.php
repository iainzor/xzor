<?php
namespace Games;

use Common\StringOperations;

class GamesLoader
{
	/**
	 * @var DbTable\Games
	 */
	private $localGames;
	
	/**
	 * @var \GiantBomb\Resource\Games
	 */
	private $giantBombGames;
	
	/**
	 * @var \GiantBomb\Resource\Game
	 */
	private $giantBombGame;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\Games $localGames
	 * @param \GiantBomb\Api $giantBombGames
	 */
	public function __construct(
		DbTable\Games $localGames, 
		\GiantBomb\Resource\Games $giantBombGames,
		\GiantBomb\Resource\Game $giantBombGame)
	{
		$this->localGames = $localGames;
		$this->giantBombGames = $giantBombGames;
		$this->giantBombGame = $giantBombGame;
	}
	
	/**
	 * Load all games matching the provided parameters.
	 * 
	 * @param string $search
	 */
	public function load(string $search = null) : array
	{
		$games = $this->localGames->findAll($search);
		
		if (strlen($search)) {
			$gbGames = $this->searchGiantBomb($search);
			$games = array_merge($games, $gbGames);
		}
		
		return $games;
	}
	
	public function searchGiantBomb(string $query) : array
	{
		$stringOps = new StringOperations();
		$gbGames = $this->giantBombGames->search($query);
		$games = [];
		
		foreach ($gbGames as $gbGame) {
			if (!$this->localGames->giantBombGameExists($gbGame->id)) {
				$slug = $stringOps->hyphenate($gbGame->name, 32);
				$this->localGames->insert([
					"giantBombId" => $gbGame->id,
					"title" => $gbGame->name,
					"description" => $gbGame->deck ? $stringOps->truncate($gbGame->deck, 253, "...") : null,
					"slug" => $slug
				]);
				$game = $this->localGames->find($slug);
				$games[] = $game;
			}
		}
		
		return $games;
	}
}