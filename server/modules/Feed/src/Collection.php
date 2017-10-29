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
		
		if (!isset($this->providers[$slug])) {
			$this->providers[$slug] = $provider;
			$this->results[$slug] = [];
		}
		
		$this->results[$slug] = array_merge($this->results[$slug], $items);
	}
	
	public function jsonSerialize() : array
	{
		$data = [
			"providers" => [],
			"results" => []
		];
		
		foreach ($this->providers as $slug =>$provider) {
			$data["providers"][] = [
				"name" => $provider->getName(),
				"slug" => $slug,
				"theme" => $provider->getTheme(),
			];
			$data["results"] = array_merge($data["results"], array_map(function(FeedItem $item) use ($slug) {
				$item->provider = $slug;
				
				return $item;
			}, $this->results[$slug]));
		}
		
		return $data;
	}
}