<?php
namespace Games\Controller;

use Http\Route,
	Games\GamesLoader;

class Game
{
	/**
	 * @var \Games\Game
	 */
	private $game;
	
	/**
	 * Constructor
	 * 
	 * @param Route $route
	 * @param \Games\GamesLoader $gamesLoader
	 */
	public function __construct(Route $route, GamesLoader $gamesLoader)
	{
		$this->game = $gamesLoader->load(
			$route->param("slug")
		);
	}
	
	public function indexAction()
	{
		return $this->game;
	}
	
	public function thumbnailAction(
		\GiantBomb\Resource\Game $gbGame, 
		\GiantBomb\Resource\Image $gbImage,
		\Http\Response $response,
		\Http\Request $request
	)
	{
		$game = $gbGame->load($this->game->giantBombId);
		
		return $gbImage->load($game->image["medium_url"]);
	}
}