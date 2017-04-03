<?php
namespace Account\Controller;

use Account\DbTable\Accounts,
	Account\DbTable\AccountServices,
	Account\Session,
	Http\Request,
	Http\Route;

abstract class AbstractVerifier
{
	abstract public function isValid(Request $request) : bool;
	abstract public function getAccountId() : string;
	abstract public function getAccountName() : string;
	
	public function verifyAction(Accounts $accounts, AccountServices $services, Request $request, Route $route) 
	{
		$session = new Session();
		
		if ($this->isValid($request)) {
			$serviceName = $route->param("service");
			$serviceAccountId = $this->getAccountId();
			$service = $services->load($serviceName, $serviceAccountId);
			
			if ($service->accountId) {
				$account = $accounts->load($service->accountId);
			} else {
				$account = $accounts->create($this->getAccountName());
				$service->accountId = $account->id;
				$services->save($service);
			}
			
			$session->setAccount($account);
		}
		
		return $session;
	}
}
