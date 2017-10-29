<?php
namespace Twitch\Feed;

use Feed\ProviderCollectorInterface,
	Feed\FeedItem,
	Games\DbTable\Games,
	Games\DbTable\GameSettings,
	Twitch\Api;

class GameFeedCollector implements ProviderCollectorInterface
{
	/**
	 * @var \Twitch\Api
	 */
	private $api;
	
	/**
	 * @var \Games\DbTable\Games
	 */
	private $games;
	
	/**
	 * @var \Games\DbTable\GameSettings
	 */
	private $gameSettings;
	
	/**
	 * Constructor
	 * 
	 * @param Api $api
	 * @param \Games\DbTable\Games $games
	 * @param \Games\DbTable\GameSettings $gameSettings
	 */
	public function __construct(Api $api, Games $games, GameSettings $gameSettings) 
	{
		$this->api = $api;
		$this->games = $games;
		$this->gameSettings = $gameSettings;
	}
	
	public function collect(string $resourceId = null) : array 
	{
		$game = $this->games->find($resourceId);
		$settings = $this->gameSettings->findForGame($game);
		$gameName = $settings->get(FeedSettings::GAME_NAME);
		$items = [];
		
		if ($gameName) {
			$response = $this->api->get("search/streams.json", [
				"query" => $gameName
			]);
			$streams = isset($response["streams"]) ? $response["streams"] : [];

			foreach ($streams as $stream) {
				$created = strtotime($stream["created_at"]);
				$title = $stream["channel"]["status"];
				$url = $stream["channel"]["url"];
				$images = $stream["preview"];
				$image = isset($images) ? $images["medium"] : null;

				$items[] = new FeedItem($created, $title, $url, $image, [
					"displayName" => $stream["channel"]["display_name"],
					"viewers" => $stream["viewers"],
					"game" => $stream["game"]
				]);
			}
		}
		
		return $items;
	}
}