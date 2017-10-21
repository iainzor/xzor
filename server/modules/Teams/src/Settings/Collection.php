<?php
namespace Teams\Settings;

use Teams\DbModel;

class Collection implements \JsonSerializable
{
	/**
	 * @var DbModel\Team
	 */
	private $team;
	
	/**
	 * @var DbModel\TeamSetting[]
	 */
	private $settings = [];
	
	/**
	 *
	 * @var SettingDefinition[]
	 */
	private $definitions = [];
	
	/**
	 * @var boolean
	 */
	private $showPrivateSettings = false;
	
	/**
	 * Constructor
	 * 
	 * @param \Teams\DbModel\Team $team
	 * @param SettingDefinition[] $definitions
	 */
	public function __construct(DbModel\Team $team, array $definitions)
	{
		$this->team = $team;
		
		foreach ($definitions as $def) {
			$this->definitions[$def->key] = $def;
		}
	}
	
	/**
	 * Set whether private settings should be exported in the JSON data
	 * 
	 * @param bool $flag
	 */
	public function showPrivateSettings(bool $flag)
	{
		$this->showPrivateSettings = $flag;
	}
	
	/**
	 * Add a setting to the container if a definition for it exists
	 * 
	 * @param \Teams\DbModel\TeamSetting $setting
	 */
	public function add(DbModel\TeamSetting $setting)
	{
		if (isset($this->definitions[$setting->key])) {
			$this->settings[$setting->key] = $setting;
		}
	}
	
	/**
	 * Add multiple settings to the container
	 * 
	 * @param array $settings
	 */
	public function addAll(array $settings)
	{
		foreach ($settings as $setting) {
			$this->add($setting);
		}
	}
	
	/**
	 * Get all visible setting definitions
	 * 
	 * @return SettingDefinition[]
	 */
	public function getVisible() : array
	{
		return array_filter($this->definitions, function(SettingDefinition $def) {
			return $def->isPublic || $this->showPrivateSettings;
		});
	}
	
	/**
	 * Export the settings as a key => value array
	 * 
	 * @return array
	 */
	public function jsonSerialize() : array 
	{
		$data = [];
		foreach ($this->getVisible() as $def) {
			$value = isset($this->settings[$def->key]) ? $this->settings[$def->key]->value : null;
			
			$data[$def->key] = $value;
		}
		return $data;
	}
}
