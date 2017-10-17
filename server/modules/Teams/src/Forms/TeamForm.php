<?php
namespace Teams\Forms;

use Account\Account,
	Forms\AbstractForm,
	Forms\Validator,
	Forms\Field,
	Teams\DbModel,
	Teams\DbTable,
	Teams\TeamSaver,
	Teams\TeamOperations,
	Teams\Settings;

class TeamForm extends AbstractForm 
{
	/**
	 * @var Account
	 */
	private $account;
	
	/**
	 * @var TeamSaver
	 */
	private $saver;
	
	/**
	 * @var DbTable\Teams
	 */
	private $teams;
	
	/**
	 * @var DbModel\Team
	 */
	private $team;
	
	/**
	 * @var TeamOperations 
	 */
	private $teamOps;
	
	/**
	 * @var Settings\Registry
	 */
	private $settings;
	
	/**
	 * Constructor
	 * 
	 * @param Account $account
	 * @param TeamSaver $saver
	 * @param DbTable\Teams $teams
	 * @param TeamOperations $teamOps
	 * @param Settings\Registry $settings
	 */
	public function __construct(Account $account, TeamSaver $saver, DbTable\Teams $teams, TeamOperations $teamOps, Settings\Registry $settings)
	{
		$this->account = $account;
		$this->saver = $saver;
		$this->teams = $teams;
		$this->teamOps = $teamOps;
		$this->settings = $settings;
		
		$this->validate("name", [
			new Validator\NotEmpty("Please provide a name for your team")
		]);
		$this->validate("slug", [
			new Validator\NotEmpty("Please provider a URL to your team"),
			new Validator\Callback([$this, "validateSlug"])
		]);
		$this->validate("settings", [
			new Validator\Callback([$this, "validateSettings"])
		]);
	}
	
	/**
	 * Set the team instance to update, instead of creating a new team
	 * 
	 * @param \Teams\DbModel\Team $team
	 */
	public function setTeam(DbModel\Team $team)
	{
		$this->team = $team;
	}
	
	/**
	 * @return array
	 */
	public function getFieldNames() : array 
	{
		return ["name", "description", "slug", "theme", "tag", "tagPosition", "member", "settings"];
	}
	
	/**
	 * @param Field $field
	 * @param \Teams\Forms\TeamForm $form
	 * @return bool
	 */
	public function validateSlug(Field $field, TeamForm $form) : bool
	{
		$isValid = true;
		$existing = false;
		
		try {
			$existing = $this->teams->fetchBySlug($field->value);
		} catch (\Exception $e) {}
		
		if ($existing && !$this->team) {
			$isValid = false;
		} else if ($existing && $this->team->id != $existing->id) {
			$isValid = false;
		}
		
		if (!$isValid) {
			$field->setError("That URL is already registered");
		}
		
		return $isValid;
	}
	
	/**
	 * Validate the team settings
	 * 
	 * @param Field $field
	 * @param \Teams\Forms\TeamForm $form
	 * @return bool
	 */
	public function validateSettings(Field $field, TeamForm $form) : bool
	{
		$isValid = true;
		$settings = $form->getValue("settings");
		
		foreach ($this->settings->getAll() as $def) {
			$value = isset($settings[$def->key]) ? $settings[$def->key] : null;
			
			if (!$def->isValid($value, $settings)) {
				$isValid = false;
			}
		}
		
		if (!$isValid) {
			$field->setError("Please provide all required settings");
		}
		
		return $isValid;
	}
	
	public function onValidated() 
	{
		$isNew = $this->team && $this->team->id ? false : true;
		$member = $this->getValue("member");
		$team = new DbModel\Team([
			"id" => $this->team ? $this->team->id : null,
			"name" => $this->getValue("name"),
			"slug" => $this->getValue("slug"),
			"description" => $this->getValue("description"),
			"tag" => $this->getValue("tag"),
			"tagPosition" => $this->getValue("tagPosition"),
			"settings" => $this->getValue("settings")
		]);
		$team->theme = new DbModel\TeamTheme($this->getValue("theme"));
		
		$this->saver->save($team);
		
		if ($isNew && !empty($member)) {
			$memberName = isset($member["name"]) ? $member["name"] : $this->account->name;
			
			$this->teamOps->makeAdmin($this->account, $team, $memberName);
		}
		
		$this->addData("team", $team);
	}
}
