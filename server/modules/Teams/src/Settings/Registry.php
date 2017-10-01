<?php
namespace Teams\Settings;

use Teams\DbModel,
	Teams\DbTable;

class Registry implements \JsonSerializable
{
	/**
	 *
	 * @var DbTable\TeamSettings
	 */
	private $teamSettings;
	
	/**
	 * @var SettingDefinition[]
	 */
	private $settings = [];
	
	/**
	 * Constructor
	 * 
	 * @param \Teams\DbTable\TeamSettings $teamSettings
	 */
	public function __construct(DbTable\TeamSettings $teamSettings)
	{
		$this->teamSettings = $teamSettings;
	}
	
	public function loadForTeam(DbModel\Team $team) : Container 
	{
		$results = $this->teamSettings->load($team);
		$container = new Container($team, $this->settings);
		$container->addAll($results);
		
		return $container;
	}
	
	/**
	 * Register a setting definition
	 * 
	 * @param \Teams\Settings\SettingDefinition $def
	 */
	public function register(SettingDefinition $def)
	{
		$this->settings[$def->key] = $def;
	}
	
	public function jsonSerialize() : array 
	{
		return $this->settings;
	}
}
