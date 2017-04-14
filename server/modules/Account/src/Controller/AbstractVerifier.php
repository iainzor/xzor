<?php
namespace Account\Controller;

use Account\DbTable\Accounts,
	Account\DbTable\AccountProviders,
	Account\Session,
	Http\Request,
	Http\Route;

abstract class AbstractVerifier
{
	abstract public function isValid(Request $request) : bool;
	abstract public function getAccountId() : string;
	abstract public function getAccountName() : string;
	
	public function verifyAction(Accounts $accounts, AccountProviders $providers, Request $request, Route $route) 
	{
		$session = new Session();
		
		if ($this->isValid($request)) {
			$serviceName = $route->param("service");
			$serviceAccountId = $this->getAccountId();
			$provider = $providers->load($serviceName, $serviceAccountId);
			
			if ($provider->accountId) {
				$account = $accounts->load($provider->accountId);
			} else {
				$account = $accounts->create($this->getAccountName());
				$provider->accountId = $account->id;
				$providers->save($provider);
			}
			
			$session->setAccount($account);
		}
		
		return $session;
	}
}
