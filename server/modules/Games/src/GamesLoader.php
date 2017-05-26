<?php
namespace Games;

use Sources\SourceRegistry;

class GamesLoader
{
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
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
	 * @var \Sources\SourceRegistry
	 */
	private $sources;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\Games $gamesTable
	 * @param GameImageLoader $imageLoader
	 * @param \Sources\SourceRegitry $sources
	 */
	public function __construct(
		DbTable\Games $gamesTable,
		GameImageLoader $imageLoader,
		GameThemeLoader $themeLoader,
		SourceRegistry $sources
	) {
		$this->gamesTable = $gamesTable;
		$this->imageLoader = $imageLoader;
		$this->themeLoader = $themeLoader;
		$this->sources = $sources;
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
		$this->imageLoader->attachCoverImages($games);
		$this->themeLoader->attachThemes($games);
		
		return [
			"q" => $search,
			"results" => $games,
			"sources" => $this->sources->all()
		];
	}
}