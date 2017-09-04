<?php
namespace Games\Roles;

use Games\Config;

class RoleDefinition
{
	public $name;
	public $title;
	public $allowAll = false;
	
	/**
	 * Constructor
	 * 
	 * @param string $name A unique role name
	 * @param array $properties A key => value array of role properties
	 */
	public function __construct(string $name, array $properties)
	{
		$this->name = $name;
		
		foreach ($properties as $key => $value) {
			switch ($key) {
				case Config::ROLE_TITLE:
					$this->title = $value;
					break;
				case Config::ROLE_ALLOW_ALL:
					$this->allowAll = (boolean) $value;
					break;
			}
		}
	}
}
