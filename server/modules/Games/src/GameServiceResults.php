<?php
namespace Games;

use Sources\ServiceResultsInterface;

class GameServiceResults implements ServiceResultsInterface
{
	const SLUG = "games";
	const NAME = "Games";
	
	/**
	 * @var Model\Game[]
	 */
	private $results = [];
	
	/**
	 * Constructor
	 * 
	 * @param array $results
	 */
	public function __construct(array $results) {
		foreach ($results as $result) {
			$this->addResult($result);
		}
	}
	
	/**
	 * @return string
	 */
	public function slug(): string { return self::SLUG; }
	
	/**
	 * @return string
	 */
	public function name(): string { return self::NAME; }
	
	/**
	 * @param \Games\Model\Game $game
	 */
	public function addResult(Model\Game $game) {
		$this->results[] = $game;
	}
	
	/**
	 * @return Model\Game[]
	 */
	public function results(): array {
		return $this->results;
	}

	
}