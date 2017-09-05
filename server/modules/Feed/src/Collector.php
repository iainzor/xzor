<?php
namespace Feed;

use Cache\Cache;

class Collector
{
	/**
	 * @var Cache
	 */
	private $cache;
	
	/**
	 * @var DefinitionInterface
	 */
	private $definition;
	
	/**
	 * Constructor
	 * 
	 * @param \Cache\Cache $cache
	 * @param \Feed\DefinitionInterface $definition
	 */
	public function __construct(Cache $cache, FeedDefinitionInterface $definition)
	{
		$this->cache = $cache;
		$this->definition = $definition;
	}
	
	/**
	 * Collect all items.  An optional $resourceId can be provided to collect 
	 * items for a specified resource
	 * 
	 * @param string $resourceId
	 * @return \Feed\Collection
	 */
	public function collect(string $resourceId = null) : Collection
	{
		$providers = $this->definition->getProviders($resourceId);
		$collection = new Collection();
		
		foreach ($providers as $provider) {
			$cacheKey = $this->definition->getName() ."-". $provider->getName() ."-". $resourceId;
			$results = $this->cache->get($cacheKey);
			
			if (!$results) {
				try {
					$results = $provider->getCollector()->collect($resourceId);
					$this->cache->put($cacheKey, $results);
				} catch (\Exception $e) {
					$results = [];
				}
			}
			
			$collection->addResults($provider, $results);
		}
		
		return $collection;
	}
}
