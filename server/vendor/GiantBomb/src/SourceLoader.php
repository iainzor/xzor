<?php
namespace GiantBomb;

use Games\GameServiceResults,
	Sources\SourceLoaderInterface,
	Sources\SourceSearchResponse;

class SourceLoader implements SourceLoaderInterface
{
	/**
	 * @var Source
	 */
	private $source;
	
	/**
	 * @var Api
	 */
	private $api;
	
	/**
	 * Constructor
	 * 
	 * @param \GiantBomb\Api $api
	 */
	public function __construct(Source $source, Api $api)
	{
		$this->source = $source;
		$this->api = $api;
	}
	
	/**
	 * @param string $q
	 * @return SourceSearchResponse
	 */
	public function find(string $q) : SourceSearchResponse 
	{
		$response = new SourceSearchResponse($this->source, $q);
		$gamesResource = new Resource\Games($this->api);
		$gbGames = $gamesResource->search($q);
		$games = array_map(function(Model\Game $gbGame) {
			return $gbGame->generateXzorGame();
		}, $gbGames);
		$gameResults = new GameServiceResults($games);
		$response->addResults($gameResults);
		
		return $response;
	}
}