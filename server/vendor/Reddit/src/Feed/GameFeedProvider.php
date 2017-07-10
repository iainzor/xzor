<?php
namespace Reddit\Feed;

use Feed\ProviderDefinitionInterface,
	Feed\ProviderCollectorInterface,
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
	 * @return \Feed\ProviderCollectorInterface
	 */
	public function getCollector(): ProviderCollectorInterface 
	{
		return $this->collector;
	}
	
	/**
	 * @return string
	 */
	public function getName(): string 
	{
		return "reddit";
	}
	
	/**
	 * @return ThemeInterface
	 */
	public function getTheme(): ThemeInterface 
	{
		return new Theme("#eee", "#212121");
	}
}