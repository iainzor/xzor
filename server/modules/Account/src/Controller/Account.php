<?php
namespace Account\Controller;

use Account\AccountLoader,
	Account\AccountSessionLoader,
	Account\Config,
	Account\Form\AccountForm,
	Core\ModuleConfig,
	Http\Request;

class Account
{
	/**
	 * @var \Account\AccountLoader
	 */
	private $accountLoader;
	
	/**
	 *
	 * @var \Account\DbModel\AccountSession
	 */
	private $session;
	
	/**
	 *
	 * @var \Account\Account
	 */
	private $account;
	
	/**
	 * Constructor
	 * 
	 * @param \Core\ModuleConfig $config
	 * @param \Account\AccountSessionLoader $sessionLoader
	 * @param \Account\AccountLoader $accountLoader
	 */
	public function __construct(ModuleConfig $config, AccountSessionLoader $sessionLoader, AccountLoader $accountLoader) 
	{
		$this->session = $sessionLoader->load(
			$config->get(Config::SESSION_NAME),
			$config->get(Config::SESSION_LIFETIME)
		);
		$this->accountLoader = $accountLoader;
		$this->account = $this->load();
	}
	
	/**
	 * @return \Account\Account
	 */
	private function load() : \Account\Account
	{
		return $this->accountLoader->load(
			$this->session->accountId
		);
	}
	
	/**
	 * @return \Account\Account
	 */
	public function indexAction() : \Account\Account
	{	
		return $this->account;
	}
	
	/**
	 * Update an account
	 * 
	 * @param Request $request
	 * @param AccountForm $form
	 * @return AccountForm
	 * @throws \Exception
	 */
	public function updateAction(Request $request, AccountForm $form) : AccountForm 
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		if (!$this->account->isValid) {
			throw new \Exception("Cannot update a non-existing account");
		}
		
		$form->execute(
			$this->account,
			$request->json()->data()
		);

		return $form;
	}
	
	public function signOutAction(Request $request, ModuleConfig $config) : \Account\Account
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$name = $config->get(Config::SESSION_NAME);
		unset($_SESSION[$name]);
		
		return $this->accountLoader->load();
	}
}