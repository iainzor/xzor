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
	 * @return \Feed\ProviderDefinitionInterface[]
	 */
	public function getProviders() : array;
}