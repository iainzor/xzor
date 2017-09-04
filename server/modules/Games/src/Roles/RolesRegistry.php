<?php
namespace Games\Roles;

class RolesRegistry
{
	/**
	 * @var RoleDefinition[]
	 */
	private $roles = [];
	
	/**
	 * Register a role with the registry.  This will overwrite any existing role
	 * with the same name
	 * 
	 * @param \Games\Roles\RoleDefinition $role
	 */
	public function register(RoleDefinition $role)
	{
		$this->roles[$role->name] = $role;
	}
	
	/**
	 * Attempt to retrieve a role by its name
	 * 
	 * @param string $name
	 * @return \Games\Roles\RoleDefinition
	 * @throws \InvalidArgumentException
	 */
	public function get(string $name) : RoleDefinition 
	{
		if (!isset($this->roles[$name])) {
			throw new \InvalidArgumentException("Invalid role name: ". $name);
		}
		return $this->roles[$name];
	}
}
