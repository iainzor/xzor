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
	 * @return \Feed\ProviderDefinitionInterface[]
	 */
	public function getProviders() : array 
	{
		return $this->providers;
	}
}