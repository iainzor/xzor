<?php
namespace Teams;

class TeamSaver
{
	/**
	 * @var DbTable\Teams
	 */
	private $teams;
	
	/**
	 * @var DbTable\TeamThemes
	 */
	private $themes;
	
	/**
	 * @var DbTable\TeamSettings
	 */
	private $settings;
	
	/**
	 * @var TeamLoader
	 */
	private $loader;
	
	/**
	 * Constructor
	 * 
	 * @param \Teams\DbTable\Teams $teams
	 * @param \Teams\DbTable\TeamThemes $themes
	 * @param \Teams\DbTable\TeamSettings $settings
	 * @param \Teams\TeamLoader $loader
	 */
	public function __construct(DbTable\Teams $teams, DbTable\TeamThemes $themes, DbTable\TeamSettings $settings, TeamLoader $loader)
	{
		$this->teams = $teams;
		$this->themes = $themes;
		$this->settings = $settings;
		$this->loader = $loader;
	}
	
	/**
	 * Update a team or insert it as a new record
	 * 
	 * @param \Teams\DbModel\Team $team
	 * @return \Teams\DbModel\Team
	 */
	public function save(DbModel\Team $team) : DbModel\Team 
	{
		$data = [
			"name" => $team->name,
			"slug" => $team->slug,
			"description" => $team->description,
			"tag" => $team->tag,
			"tagPosition" => $team->tagPosition
		];
		
		if ($team->id) {
			$this->teams->update($data, [
				"id" => $team->id
			]);
		} else {
			$team->id = $this->teams->insert($data);
		}
		
		
		if ($team->theme) {
			$this->themes->insert([
				"teamId" => $team->id,
				"background" => $team->theme->getBackground(),
				"text" => $team->theme->getText()
			], [
				"background", 
				"text"
			]);
		}
		
		foreach ($team->settings as $key => $value) {
			$this->settings->insert([
				"teamId" => $team->id,
				"key" => $key,
				"value" => $value
			], ["value"]);
		}
		
		return $this->loader->loadById($team->id);
	}
}
