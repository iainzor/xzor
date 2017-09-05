<?php
namespace Reddit\Feed;

use Feed\ProviderDefinitionInterface,
	Feed\ProviderCollectorInterface,
	Feed\ProviderSettings,
	Feed\ProviderSetting,
	UI\ThemeInterface,
	UI\Theme;

class GameFeedProvider implements ProviderDefinitionInterface
{
	/**
	 * @var GameFeedCollector
	 */
	private $collector;
	
	/**
	 * Constructor
	 * 
	 * @param \Reddit\Feed\GameFeedCollector $collector
	 */
	public function __construct(GameFeedCollector $collector)
	{
		$this->collector = $collector;
	}
	
	/**
	 * @return string
	 */
	public function getName(): string 
	{
		return "Reddit";
	}
	
	/**
	 * @return ThemeInterface
	 */
	public function getTheme(): ThemeInterface 
	{
		return new Theme("#eee", "#212121");
	}
	
	/**
	 * @return \Feed\ProviderCollectorInterface
	 */
	public function getCollector(): ProviderCollectorInterface 
	{
		return $this->collector;
	}
	
	public function getSettings() : ProviderSettings 
	{
		return new ProviderSettings([
			new ProviderSetting(FeedSettings::SUBREDDIT_NAME, "Subreddit Name", "Provide the name of a subreddit to collect items from")
		]);
	}
}