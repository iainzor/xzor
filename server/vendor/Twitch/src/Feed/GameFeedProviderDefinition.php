<?php
namespace Twitch\Feed;

use Feed\ProviderDefinitionInterface,
	Feed\ProviderCollectorInterface,
	Feed\ProviderSettings,
	Feed\ProviderSetting,
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

	public function getName(): string 
	{
		return "Twitch";
	}

	public function getTheme(): ThemeInterface 
	{
		return new Theme("#4b367c", "#fff");
	}
	
	public function getCollector(): ProviderCollectorInterface 
	{
		return $this->collector;
	}
	
	public function getSettings() : ProviderSettings
	{
		return new ProviderSettings([
			new ProviderSetting(FeedSettings::GAME_NAME, "Search Query", "Specify the search query used with finding streamers")
		]);
	}
}