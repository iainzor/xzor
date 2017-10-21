<?php
namespace Teams\Settings;

use Database\Query\QueryParams,
	Teams\DbModel,
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
	
	/**
	 * Load all available settings for a team
	 * 
	 * @param \Teams\DbModel\Team $team
	 * @return \Teams\Settings\Collection
	 */
	public function loadForTeam(DbModel\Team $team) : Collection 
	{
		$results = $this->teamSettings->load($team);
		$container = new Collection($team, $this->settings);
		$container->addAll($results);
		
		return $container;
	}
	
	/**
	 * Save settings for a team
	 * 
	 * @param \Teams\DbModel\Team $team
	 * @param array $settings  An array of [key => value] pairs
	 * @return bool
	 */
	public function saveForTeam(DbModel\Team $team, array $settings) : bool
	{
		try {
			foreach ($settings as $key => $value) {
				$this->teamSettings->insert([
					"teamId" => $team->id,
					"key" => $key,
					"value" => $value
				], ["value"]);
			}
		} catch (\Exception $e) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * Attach settings to all provided teams
	 * 
	 * @param array $teams
	 */
	public function attachToAll(array $teams)
	{
		$ids = array_map(function(DbModel\Team $team) { return $team->id; }, $teams);
		$map = array_combine($ids, $teams);
		
		if (count($ids) > 0) {
			$results = $this->teamSettings->fetchAll(new QueryParams([
				"teamId" => $ids
			]));
			
			foreach ($results as $setting) {
				if (isset($this->settings[$setting->key])) {
					$def = $this->settings[$setting->key];
					$team = $map[$setting->teamId];

					if ($def->isPublic) {
						$team->settings[$setting->key] = $setting->value;
					}
				}
			}
		}
	}
	
	/**
	 * Get all registered settings
	 * 
	 * @return SettingDefinition[]
	 */
	public function getAll() : array
	{
		return $this->settings;
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
		return array_values($this->settings);
	}
}
