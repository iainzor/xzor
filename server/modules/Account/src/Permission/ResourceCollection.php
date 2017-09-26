<?php
namespace Account\Permission;

class ResourceCollection implements \JsonSerializable
{
	/**
	 * @var PermissionCollection[]
	 */
	private $resources = [];
	
	public function add(PermissionCollection $permissions)
	{
		if (!isset($this->resources[$permissions->getResource()])) {
			$this->resources[$permissions->getResource()] = $permissions;
		} else {
			$this->resources[$permissions->getResource()]->merge($permissions);
		}
	}
	
	public function jsonSerialize() : array
	{
		return $this->resources;
	}
}
