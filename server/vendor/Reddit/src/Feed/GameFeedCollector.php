<?php
namespace Reddit\Feed;

use Feed\ProviderCollectorInterface,
	Feed\FeedItem,
	Games\GamesLoader,
	Reddit\Api;

class GameFeedCollector implements ProviderCollectorInterface
{
	/**
	 * @var \Reddit\Api
	 */
	private $api;
	
	/**
	 * @var \Games\GamesLoader
	 */
	private $gamesLoader;
	
	/**
	 * Constructor
	 * 
	 * @param \Reddit\Api $api
	 */
	public function __construct(Api $api, GamesLoader $gamesLoader)
	{
		$this->api = $api;
		$this->gamesLoader = $gamesLoader;
	}
	
	/**
	 * Collect all posts from a game's subreddit
	 * 
	 * @param string $resourceId
	 * @return array
	 */
	public function collect(string $resourceId = null) : array
	{
		$game = $this->gamesLoader->load($resourceId);
		$listing = $this->api->get("/r/". $game->slug ."/hot.json");
		$items = [];
		
		foreach ($listing["data"]["children"] as $post) {
			$url = $post["data"]["url"];
			$title = html_entity_decode($post["data"]["title"]);
			$thumbnail = !empty($post["data"]["thumbnail"]) && $post["data"]["thumbnail"] !== "self"
				? $post["data"]["thumbnail"]
				: null;
			
			$items[] = new FeedItem($title, $url, [
				"permalink" => $this->api->url($post["data"]["permalink"]),
				"subreddit" => $post["data"]["subreddit"],
				"upVotes" => $post["data"]["ups"],
				"downVotes" => $post["data"]["downs"],
				"score" => $post["data"]["score"],
				"comments" => $post["data"]["num_comments"],
				"thumbnail" => $thumbnail
			]);
		}
		
		return $items;
	}
}
