<?php
namespace Teams;

use Account\Account,
	Account\Permission\ResourceProviderInterface,
	Account\Permission\PermissionCollection,
	Account\Permission\PermissionDefinition;

class TeamsPermissionProvider implements ResourceProviderInterface
{
	public function getResource() : string { return "teams"; }
	
	public function requiresResourceId() : bool { return false; }
	
	/**
	 * 
	 * @param PermissionCollection $permissions
	 * @param Account $account
	 * @param string $resourceId
	 */
	public function providePermissions(PermissionCollection $permissions, Account $account, string $resourceId = null) 
	{
		$permissions->add(new PermissionDefinition("new", $account->isValid));
	}
}
