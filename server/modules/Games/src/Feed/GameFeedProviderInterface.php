<?php
namespace Games\Feed;

use Core\DI,
	Feed\ProviderDefinitionInterface;

interface GameFeedProviderInterface
{
	public function generateGameFeedProvider(DI $di) : ProviderDefinitionInterface;
}