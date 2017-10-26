<?php
namespace Games\Controller;

use Account\Account,
	Cache\Cache,
	Database\Query\QueryParams,
	Feed\Feed,
	Http\Route,
	Http\Request,
	Games\GamesLoader,
	Games\DbTable\GameFollowers,
	Games\DbTable\GameSettings,
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
	
	public function settingsAction(Request $request, GameSettings $settings)
	{
		if ($request->methodIsPost()) {
			$pairs = $request->json()->data();
			foreach ($pairs as $key => $value) {
				$settings->insert([
					"gameId" => $this->game->id,
					"key" => $key,
					"value" => $value
				], ["value"]);
			}
		}
		
		return $settings->findForGame($this->game);
	}
	
	public function feedAction(Cache $cache, Request $request, Feed $feed, GameFeedDefinition $definition)
	{
		$cacheKey = "game-". $this->game->id ."-feed";
		$fresh = (bool) $request->inputGet("fresh");
		
		if (!$fresh && $stale = $cache->get($cacheKey)) {
			return $stale;
		}
		
		$collector = $feed->collector($definition);
		$results = $collector->collect($this->game->slug);
		$cache->put($cacheKey, $results->jsonSerialize(), 28800);
		
		return $results;
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