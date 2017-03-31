<?php
namespace Games;

class GamesLoader
{
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\Games $gamesTable
	 */
	public function __construct(DbTable\Games $gamesTable)
	{
		$this->gamesTable = $gamesTable;
	}
	
	/**
	 * Load all local games matching the provided parameters.
	 * 
	 * @param string $search
	 */
	public function load(string $search = null) : array
	{
		$games = $this->gamesTable->findAll($search);
		
		return $games;
	}
}