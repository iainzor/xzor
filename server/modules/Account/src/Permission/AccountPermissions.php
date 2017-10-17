<?php
namespace Account\Permission;

use Account\Account;

class AccountPermissions
{
	/**
	 * @var Account
	 */
	private $account;
	
	/**
	 *
	 * @var PermissionRegistry
	 */
	private $registry;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\Account $account
	 * @param \Account\Permission\PermissionRegistry $registry
	 */
	public function __construct(Account $account, PermissionRegistry $registry)
	{
		$this->account = $account;
		$this->registry = $registry;
	}
	
	public function isAllowed(string $action, string $resource, string $resourceId = null) : bool
	{
		$permissions = $this->registry->getAll($this->account, $resource, $resourceId);
		
		return $permissions->resource($resource)->isAllowed($action);
	}
}
