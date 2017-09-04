<?php
namespace Games\Feed;

use Feed\ProviderDefinitionInterface,
	Feed\ProviderSettings,
	Games\GameSettingsContainer as GameSettings,
	UI\ThemeInterface;

class ProviderConfig
{
	/**
	 * @var string
	 */
	public $name;
	
	/**
	 * @var ThemeInterface
	 */
	public $theme;
	
	/**
	 * @var ProviderSettings
	 */
	public $settings;
	
	/**
	 * Constructor
	 * 
	 * @param ProviderDefinitionInterface $provider
	 */
	public function __construct(ProviderDefinitionInterface $provider)
	{
		$this->name = $provider->getName();
		$this->theme = $provider->getTheme();
		$this->settings = $provider->getSettings();
	}
	
	/**
	 * Populate the provider settings using a game's settings
	 * 
	 * @param GameSettings $gameSettings
	 */
	public function populate(GameSettings $gameSettings)
	{
		foreach ($this->settings->getAll() as $setting) {
			$setting->value = $gameSettings->get($setting->name);
		}
	}
}
