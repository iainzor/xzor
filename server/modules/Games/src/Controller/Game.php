<?php
namespace Games\Controller;

use Http\Route,
	Games\DbTable;

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
	 * @param \Games\DbTable\Games $games
	 */
	public function __construct(Route $route, DbTable\Games $games)
	{
		$this->game = $games->find(
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