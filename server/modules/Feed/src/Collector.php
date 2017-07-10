<?php
namespace Feed;

class Collector
{
	/**
	 * @var Feed
	 */
	private $feed;
	
	/**
	 * @var DefinitionInterface
	 */
	private $definition;
	
	/**
	 * Constructor
	 * 
	 * @param \Feed\Feed $feed
	 * @param \Feed\DefinitionInterface $definition
	 */
	public function __construct(Feed $feed, FeedDefinitionInterface $definition)
	{
		$this->feed = $feed;
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
			$collection->addResults(
				$provider,
				$provider->getCollector()->collect($resourceId)
			);
		}
		
		return $collection;
	}
}
