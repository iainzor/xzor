<?php
namespace Teams\DbModel;

use Database\Model\AbstractModel;

class TeamMember extends AbstractModel
{
	private $team;
	
	public $id;
	public $accountId;
	public $teamId;
	public $name;
	public $displayName;
	public $isAdmin = false;
	
	public function __construct(array $properties = array(), array $map = array()) 
	{
		parent::__construct($properties, $map);
		
		$this->isAdmin = (bool) $this->isAdmin;
	}
	
	public function setTeam(Team $team)
	{
		$this->team = $team;
		$this->displayName = $team->displayName($this->name);
	}
	
	public function jsonSerialize() : array
	{
		if (!$this->displayName) { 
			$this->displayName = $this->name;
		}
		
		$data = parent::jsonSerialize();
		unset($data["accountId"], $data["teamId"]);
		
		return $data;
	}
}
