<?php
namespace Twitch\Feed;

use Feed\ProviderCollectorInterface,
	Feed\FeedItem,
	Games\GamesLoader,
	Twitch\Api;

class GameFeedCollector implements ProviderCollectorInterface
{
	/**
	 * @var \Twitch\Api
	 */
	private $api;
	
	/**
	 * @var \Games\GamesLoader
	 */
	private $gamesLoader;
	
	/**
	 * Constructor
	 * 
	 * @param Api $api
	 * @param GamesLoader $gamesLoader
	 */
	public function __construct(Api $api, GamesLoader $gamesLoader) 
	{
		$this->api = $api;
		$this->gamesLoader = $gamesLoader;
	}
	
	public function collect(string $resourceId = null) : array 
	{
		$game = $this->gamesLoader->load($resourceId);
		$response = $this->api->get("streams.json", [
			"game" => $game->slug
		]);
		$streams = isset($response["streams"]) ? $response["streams"] : [];
		$items = [];
		
		foreach ($streams as $stream) {
			$items[] = new FeedItem($stream["channel"]["status"], $stream["channel"]["url"], [
				"displayName" => $stream["channel"]["display_name"],
				"preview" => $stream["preview"],
				"viewers" => $stream["viewers"]
			]);
		}
		
		return $items;
	}
}