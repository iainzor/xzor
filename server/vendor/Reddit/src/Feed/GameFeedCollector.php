<?php
namespace Reddit\Feed;

use Feed\ProviderCollectorInterface,
	Feed\FeedItem,
	Games\DbTable\Games,
	Games\DbTable\GameSettings,
	Reddit\Api;

class GameFeedCollector implements ProviderCollectorInterface
{
	/**
	 * @var \Reddit\Api
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
	 * @param \Reddit\Api $api
	 */
	public function __construct(Api $api, Games $games, GameSettings $gameSettings)
	{
		$this->api = $api;
		$this->games = $games;
		$this->gameSettings = $gameSettings;
	}
	
	/**
	 * Collect all posts from a game's subreddit
	 * 
	 * @param string $resourceId
	 * @return array
	 */
	public function collect(string $resourceId = null) : array
	{
		$game = $this->games->find($resourceId);
		$settings = $this->gameSettings->findForGame($game);
		$subreddit = $settings->get(FeedSettings::SUBREDDIT_NAME);
		$items = [];
		
		if (!empty($subreddit)) {
			$listing = $this->api->get("/r/". $subreddit ."/hot.json");
			
			foreach ($listing["data"]["children"] as $post) {
				$created = $post["data"]["created_utc"];
				$url = $post["data"]["url"];
				$title = html_entity_decode($post["data"]["title"]);
				$thumbnail = !empty($post["data"]["thumbnail"]) && preg_match("/^https?:\/\//i", $post["data"]["thumbnail"])
					? $post["data"]["thumbnail"]
					: null;

				$items[] = new FeedItem($created, $title, $url, $thumbnail, [
					"permalink" => $this->api->url($post["data"]["permalink"]),
					"subreddit" => $post["data"]["subreddit"],
					"upVotes" => $post["data"]["ups"],
					"downVotes" => $post["data"]["downs"],
					"score" => $post["data"]["score"],
					"comments" => $post["data"]["num_comments"]
				]);
			}
		}
		
		return $items;
	}
}
