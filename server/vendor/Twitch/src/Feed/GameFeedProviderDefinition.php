<?php
namespace Twitch\Feed;

use Feed\ProviderDefinitionInterface,
	Feed\ProviderCollectorInterface,
	UI\Theme,
	UI\ThemeInterface;

class GameFeedProviderDefinition implements ProviderDefinitionInterface
{
	/**
	 * @var GameFeedCollector
	 */
	private $collector;
	
	/**
	 * Constructor
	 * 
	 * @param \Twitch\Feed\GameFeedCollector $collector
	 */
	public function __construct(GameFeedCollector $collector) 
	{
		$this->collector = $collector;
	}
	
	public function getCollector(): ProviderCollectorInterface 
	{
		return $this->collector;
	}

	public function getName(): string 
	{
		return "Twitch";
	}

	public function getTheme(): ThemeInterface 
	{
		return new Theme("#4b367c", "#fff");
	}
}