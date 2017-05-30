<?php
namespace Account\Controller;

use Core\ModuleConfig,
	Account\Config,
	Account\DbTable\Accounts,
	Account\DbTable\AccountProviders,
	Account\DbTable\AccountSessions,
	Account\DbModel\Account,
	Account\DbModel\AccountSession,
	Http\Request,
	Http\Route;

abstract class AbstractVerifier
{
	abstract public function isValid(Request $request) : bool;
	abstract public function getAccountId() : string;
	abstract public function getAccountName() : string;
	
	public function verifyAction(
		Accounts $accounts, 
		AccountProviders $providers,
		AccountSessions $sessions,
		ModuleConfig $config,
		Request $request, 
		Route $route
	) {
		$isValid = false;
		
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
			
			$isValid = true;
			$session = $this->createSession($account, $sessions, $config);
		}
		
		return [
			"isValid" => $isValid,
			"session" => $session
		];
	}
	
	public function createSession(Account $account, AccountSessions $sessions, ModuleConfig $config) : AccountSession
	{
		$session = $sessions->create($account);
		$name = $config->get(Config::SESSION_NAME);
		
		$_SESSION[$name] = $session->id;
		
		return $session;
	}
}
