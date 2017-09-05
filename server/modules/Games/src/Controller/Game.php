<?php
namespace Games\Controller;

use Account\Account,
	Database\Query\QueryParams,
	Feed\Feed,
	Http\Route,
	Http\Request,
	Games\GamesLoader,
	Games\DbTable\GameFollowers,
	Games\Feed\GameFeedDefinition,
	Games\Feed\ProviderConfigLoader,
	Games\GameSaver;

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
	
	public function indexAction(GameSaver $saver, Request $request)
	{
		if ($request->methodIsPost()) {
			$saver->setGameId($this->game->id);
			
			return $saver->save(
				$request->json()->data()
			);
		}
		return $this->game;
	}
	
	public function feedAction(Feed $feed, GameFeedDefinition $definition)
	{
		$collector = $feed->collector($definition);
		
		return $collector->collect($this->game->slug);
	}
	
	public function feedProvidersAction(ProviderConfigLoader $loader)
	{
		return $loader->load($this->game);
	}
	
	public function followAction(Request $request, Account $account, GameFollowers $followers)
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$followers->insert([
			"gameId" => $this->game->id,
			"accountId" => $account->id,
			"created" => time()
		], ["created"]);
		
		return [
			"result" => "success",
			"message" => "You started following ". $this->game->title
		];
	}
	
	public function unfollowAction(Request $request, Account $account, GameFollowers $followers)
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$followers->delete(new QueryParams([
			"gameId" => $this->game->id,
			"accountId" => $account->id
		]));
		
		return [
			"result" => "success",
			"message" => "You stopped following ". $this->game->title
		];
	}
}