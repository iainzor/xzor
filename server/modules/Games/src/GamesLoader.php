<?php
namespace Games;

use Account\Account;

class GamesLoader
{
	/**
	 * @var Account
	 */
	private $account;
	
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * @var DbTable\GameFollowers
	 */
	private $followersTable;
	
	/**
	 * @var GameImageLoader
	 */
	private $imageLoader;
	
	/**
	 *
	 * @var GameThemeLoader
	 */
	private $themeLoader;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\Account $account
	 * @param \Games\DbTable\Games $gamesTable
	 * @param \Games\DbTable\GameFollowers $followersTable
	 * @param \Games\GameImageLoader $imageLoader
	 * @param \Games\GameThemeLoader $themeLoader
	 */
	public function __construct(
		Account $account,
		DbTable\Games $gamesTable,
		DbTable\GameFollowers $followersTable,
		GameImageLoader $imageLoader,
		GameThemeLoader $themeLoader
	) {
		$this->account = $account;
		$this->gamesTable = $gamesTable;
		$this->followersTable = $followersTable;
		$this->imageLoader = $imageLoader;
		$this->themeLoader = $themeLoader;
	}
	
	/**
	 * Search for games matching the query string
	 * 
	 * @param string $search
	 */
	public function search(string $search = "") : array
	{
		$games = $this->gamesTable->findAll($search);
		
		return $this->process($search, $games);
	}
	
	/**
	 * Load a single game by its slug
	 * 
	 * @param string $slug
	 * @return \Games\Model\Game
	 */
	public function load(string $slug) : Model\Game
	{
		$game = $this->gamesTable->find($slug);
		
		$this->process("", [$game]);
		
		return $game;
	}
	
	/**
	 * @param string $search
	 * @param Model\Game[] $games
	 * @return Model\Game[]
	 */
	private function process(string $search, array $games) : array
	{
		$this->followersTable->isFollowing($games, $this->account);
		$this->imageLoader->attachCoverImages($games);
		$this->themeLoader->attachThemes($games);
		
		return [
			"q" => $search,
			"results" => $games
		];
	}
}