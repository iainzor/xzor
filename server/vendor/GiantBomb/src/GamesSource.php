<?php
namespace GiantBomb;

use Games\Source\SourceInterface;

class GamesSource implements SourceInterface
{
	/**
	 * @var Api
	 */
	private $api;
	
	/**
	 * Constructor
	 * 
	 * @param \GiantBomb\Api $api
	 */
	public function __construct(Api $api)
	{
		$this->api = $api;
	}
}