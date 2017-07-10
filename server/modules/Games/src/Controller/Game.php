<?php
namespace Games\Controller;

use Http\Route,
	Games\GamesLoader,
	Games\Feed\GameFeedDefinition,
	Feed\Feed;

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
	
	public function feedAction(Feed $feed, GameFeedDefinition $definition)
	{
		$collector = $feed->collector($definition);
		
		return $collector->collect($this->game->slug);
	}
}