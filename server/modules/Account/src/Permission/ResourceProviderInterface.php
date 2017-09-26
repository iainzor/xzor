<?php
namespace Account\Permission;

use Account\Account;

interface ResourceProviderInterface
{
	public function getResource() : string;
	
	public function requiresResourceId() : bool;
	
	public function providePermissions(PermissionCollection $permissions, Account $account, string $resourceId = null);
}
