<?php
namespace Account\Permission;

class PermissionDefinition
{
	public $path;
	
	public $isAllowed = false;
	
	public function __construct(string $path, bool $isAllowed)
	{
		$this->path = $path;
		$this->isAllowed = $isAllowed;
	}
}
