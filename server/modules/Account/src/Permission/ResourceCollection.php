<?php
namespace Account\Permission;

class ResourceCollection implements \JsonSerializable
{
	/**
	 * @var PermissionCollection[]
	 */
	private $resources = [];
	
	/**
	 * Add a collection of permissions
	 * 
	 * @param \Account\Permission\PermissionCollection $permissions
	 */
	public function add(PermissionCollection $permissions)
	{
		if (!isset($this->resources[$permissions->getResource()])) {
			$this->resources[$permissions->getResource()] = $permissions;
		} else {
			$this->resources[$permissions->getResource()]->merge($permissions);
		}
	}
	
	/**
	 * Get a permission collection for the specified resource
	 * 
	 * @param string $resource
	 * @return \Account\Permission\PermissionCollection
	 * @throws \Exception
	 */
	public function resource(string $resource) : PermissionCollection
	{
		if (!isset($this->resources[$resource])) {
			throw new \Exception("Could not get permissions for resource '{$resource}'");
		}
		
		return $this->resources[$resource];
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() : array
	{
		return $this->resources;
	}
}
