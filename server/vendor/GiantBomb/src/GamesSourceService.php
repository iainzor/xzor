<?php
namespace GiantBomb;

use Sources\ServiceInterface,
	Sources\SourceModelInterface;

class GamesSourceService implements ServiceInterface
{
	/**
	 * @var Resource\Game
	 */
	private $resource;
	
	/**
	 * @param \GiantBomb\Resource\Game $resource
	 */
	public function __construct(Resource\Game $resource) {
		$this->resource = $resource;
	}
	
	public function load($id) : SourceModelInterface {
		$game = $this->resource->load((int) $id);
		
		return $game->generateXzorGame();
	}
}