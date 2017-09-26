<?php
namespace Account\Controller;

use Account\Account as AccountInstance,
	Account\Permission,
	Http\Route;

class Permissions
{
	/**
	 *
	 * @var \Account\Account
	 */
	private $account;
	
	public function __construct(AccountInstance $account)
	{
		$this->account = $account;
	}
	
	public function listAction(AccountInstance $account, Permission\PermissionRegistry $registry, Route $route)
	{
		$resourceName = $route->param("resource");
		$resourceId = $route->param("resourceId");
		
		return $registry->getAll($account, $resourceName, $resourceId);
	}
}