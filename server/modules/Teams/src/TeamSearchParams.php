<?php
namespace Teams;

class TeamSearchParams
{
	public $myTeams = false;
	public $q = null;
	
	/**
	 * Constructor
	 * 
	 * @param array $params [key => value] map
	 */
	public function __construct(array $params = [])
	{
		foreach ($params as $name => $value) {
			if (property_exists($this, $name)) {
				$this->{$name} = $value;
			}
		}
	}
}