<?php
namespace Games\Feed;

use Feed\AbstractFeedDefinition;

class GameFeedDefinition extends AbstractFeedDefinition
{
	/**
	 * @param string $resourceId
	 * @return \Feed\ProviderDefinitionInterface[]
	 */
	public function getProviders(string $resourceId = null) : array 
	{
		return $this->providers;
	}
}