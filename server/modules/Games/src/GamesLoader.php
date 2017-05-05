<?php
namespace Games;

use Sources\SourceRegistry;

class GamesLoader
{
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * @var \Sources\SourceRegistry
	 */
	private $sources;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\Games $gamesTable
	 * @param \Sources\SourceRegitry $sources
	 */
	public function __construct(
		DbTable\Games $gamesTable,
		SourceRegistry $sources
	) {
		$this->gamesTable = $gamesTable;
		$this->sources = $sources;
	}
	
	/**
	 * Load all local games matching the provided parameters.
	 * 
	 * @param string $search
	 */
	public function load(string $search = "") : array
	{
		$games = $this->gamesTable->findAll($search);
		
		return $this->process($search, $games);
	}
	
	private function process(string $search, array $games) : array
	{
		return [
			"q" => $search,
			"results" => $games,
			"sources" => $this->sources->all()
		];
	}
}