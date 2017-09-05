<?php
namespace Games\Feed;

use Games\DbTable\GameSettings,
	Games\Model\Game;

class ProviderConfigLoader
{
	/**
	 * @var GameFeedDefinition
	 */
	private $feedDef;
	
	/**
	 * @var GameSettings
	 */
	private $settingsTable;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\Feed\GameFeedDefinition $feedDef
	 * @param \Games\DbTable\GameSettings $settingsTable
	 */
	public function __construct(GameFeedDefinition $feedDef, GameSettings $settingsTable)
	{
		$this->feedDef = $feedDef;
		$this->settingsTable = $settingsTable;
	}
	
	public function load(Game $game) : array
	{
		$settings = $this->settingsTable->findForGame($game);
		$configs = [];
		
		foreach ($this->feedDef->getProviders() as $provider) {
			$providerConfig = new ProviderConfig($provider);
			$providerConfig->populate($settings);
			
			$configs[] = $providerConfig;
		}
		
		return $configs;
	}
}
