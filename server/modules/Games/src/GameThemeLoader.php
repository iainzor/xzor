<?php
namespace Games;

class GameThemeLoader
{
	/**
	 * @var DbTable\GameThemes
	 */
	private $themes;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\GameThemes $themes
	 */
	public function __construct(DbTable\GameThemes $themes)
	{
		$this->themes = $themes;
	}
	
	/**
	 * Attach themes to each game provided
	 * 
	 * @param Model\Game[] $games
	 */
	public function attachThemes(array $games)
	{
		$gameIds = [];
		foreach ($games as $game) {
			$gameIds[$game->id] = $game;
		}
		
		$themes = $this->themes->loadGameThemes(array_keys($gameIds));
		foreach ($themes as $theme) {
			$game = $gameIds[$theme->gameId];
			$game->theme = $theme;
		}
	}
}