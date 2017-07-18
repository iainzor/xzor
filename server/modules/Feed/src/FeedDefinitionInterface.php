<?php
namespace Feed;

interface FeedDefinitionInterface
{
	/**
	 * @return string
	 */
	public function getName() : string;
	
	/**
	 * @param \Feed\ProviderDefinitionInterface $provider
	 */
	public function addProvider(ProviderDefinitionInterface $provider);
	
	/**
	 * @param string $resourceId
	 * @return \Feed\ProviderDefinitionInterface[]
	 */
	public function getProviders(string $resourceId = null) : array;
}