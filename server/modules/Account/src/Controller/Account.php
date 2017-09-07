<?php
namespace Account\Controller;

use Account\Account as AccountInstance,
	Account\Config,
	Account\Form\AccountForm,
	Core\ModuleConfig,
	Http\Request;

class Account
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
	
	public function signOutAction(Request $request, ModuleConfig $config) : array
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$name = $config->get(Config::SESSION_NAME);
		unset($_SESSION[$name]);
		
		return ["result" => "success"];
	}
}