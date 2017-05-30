<?php
namespace Games;

class GameThemeSaver
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
	 * Save a theme to the database
	 * 
	 * @param \Games\Model\GameTheme $theme
	 */
	public function save(Model\GameTheme $theme) : Model\GameTheme
	{
		if (!$theme->gameId) {
			throw new \Exception("No game ID was provided for the theme");
		}
		
		$this->themes->insert([
			"gameId" => $theme->gameId,
			"background" => $theme->getBackground(),
			"text" => $theme->getText()
		], [
			"background",
			"text"
		]);
		
		return $theme;
	}
}