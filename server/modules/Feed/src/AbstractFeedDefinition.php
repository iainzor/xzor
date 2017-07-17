<?php
namespace Feed;

abstract class AbstractFeedDefinition implements FeedDefinitionInterface
{
	/**
	 * @var ProviderDefinitionInterfac[]
	 */
	protected $providers = [];
	
	/**
	 * Add a provider to the feed definition
	 * 
	 * @param \Feed\ProviderDefinitionInterface $provider
	 */
	public function addProvider(ProviderDefinitionInterface $provider) 
	{
		$this->providers[] = $provider;
	}
	
	/**
	 * @param string $resourceId
	 * @return \Feed\ProviderDefinitionInterface[]
	 */
	public function getProviders(string $resourceId = null) : array 
	{
		return $this->providers;
	}
}