<?php
namespace Games;

class GameSettingsContainer
{
	/**
	 * @var array
	 */
	private $settings = [];
	
	/**
	 * Constructor
	 * 
	 * @param Model\GameSetting[] $settings
	 */
	public function __construct(array $settings)
	{
		foreach ($settings as $setting) {
			$this->set($setting->key, $setting->value);
		}
	}
	
	public function set(string $key, $value)
	{
		$this->settings[$key] = $value;
	}
	
	public function get(string $key, $defaultValue = null)
	{
		return isset($this->settings[$key]) ? $this->settings[$key] : $defaultValue;
	}
}