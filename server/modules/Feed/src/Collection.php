<?php
namespace Feed;

use Common\StringOperations;

class Collection implements \JsonSerializable
{
	/**
	 * @var ProviderDefinitionInterface[]
	 */
	private $providers = [];
	
	/**
	 * @var FeedItem[]
	 */
	private $results = [];
	
	/**
	 * Add results for a provider
	 * 
	 * @param \Feed\ProviderDefinitionInterface $provider
	 * @param \Feed\FeedItem[] $items
	 */
	public function addResults(ProviderDefinitionInterface $provider, array $items)
	{
		$ops = new StringOperations();
		$slug = $ops->hyphenate($provider->getName());
		
		if (!isset($this->results[$slug])) {
			$this->providers[] = $provider;
			$this->results[$slug] = [];
		}
		
		$this->results[$slug] = array_merge($this->results[$slug], $items);
	}
	
	public function jsonSerialize() : array
	{
		$ops = new StringOperations();
		
		return array_map(function(ProviderDefinitionInterface $provider) use ($ops) {
			$slug = $ops->hyphenate($provider->getName());

			return [
				"name" => $provider->getName(),
				"slug" => $slug,
				"theme" => $provider->getTheme(),
				"results" => $this->results[$slug]
			];
		}, $this->providers);
	}
}