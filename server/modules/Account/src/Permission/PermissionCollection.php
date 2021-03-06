<?php
namespace Account\Permission;

class PermissionCollection implements \JsonSerializable
{
	/**
	 * @var string
	 */
	private $resource;
	
	/**
	 * @var boolean
	 */
	public $allowAll = false;
	
	/**
	 * @var PermissionDefinition[]
	 */
	private $permissions = [];
	
	/**
	 * Constructor
	 * 
	 * @param string $resource
	 */
	public function __construct(string $resource)
	{
		$this->resource = $resource;
	}
	
	/**
	 * Get the name of the resource the permissions belong to
	 * 
	 * @return string
	 */
	public function getResource() : string 
	{
		return $this->resource;
	}
	
	/**
	 * Add a permission to the collection
	 * 
	 * @param \Account\Permission\PermissionDefinition $permission
	 */
	public function add(PermissionDefinition $permission)
	{
		$this->permissions[] = $permission;
	}
	
	/**
	 * Merge an existing collection into this one
	 * 
	 * @param \Account\Permission\PermissionCollection $collection
	 */
	public function merge(PermissionCollection $collection)
	{
		$this->permissions = array_merge($this->permissions, $collection->all());
	}
	
	/**
	 * Get all permissions in the collection
	 * 
	 * @return array
	 */
	public function all() : array
	{
		return $this->permissions;
	}
	
	/**
	 * Check if an action is allowed on the resource
	 * 
	 * @param string $action
	 * @return bool
	 */
	public function isAllowed(string $action) : bool
	{
		foreach ($this->permissions as $perm) {
			if ($perm->path === $action) {
				return $perm->isAllowed;
			}
		}
		
		return $this->allowAll;
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() : array 
	{
		$permissions = [];
		foreach ($this->permissions as $perm) {
			$permissions[$perm->path] = [
				"isAllowed" => $perm->isAllowed
			];
		}
		
		return [
			"allowAll" => $this->allowAll,
			"permissions" => $permissions
		];
	}
}
