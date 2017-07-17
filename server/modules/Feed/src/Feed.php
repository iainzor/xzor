<?php
namespace Feed;

use Cache\Cache;

class Feed
{
	/**
	 * @var Cache
	 */
	private $cache;
	
	/**
	 * Constructor
	 * 
	 * @param Cache $cache
	 */
	public function __construct(Cache $cache)
	{
		$this->cache = $cache;
	}
	
	public function collector(FeedDefinitionInterface $feedDef) : Collector
	{
		return new Collector($this->cache, $feedDef);
	}
}