<?php
namespace Account\Controller;

use Account\AccountLoader,
	Account\Config,
	Core\ModuleConfig,
	Http\Request;

class Account
{
	/**
	 * @var \Account\AccountLoader
	 */
	private $loader;
	
	/**
	 *
	 * @var \Account\Account
	 */
	private $account;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\AccountLoader $loader
	 */
	public function __construct(AccountLoader $loader) 
	{
		$this->loader = $loader;
		$this->account = $loader->load();
	}
	
	/**
	 * @return \Account\Account
	 */
	public function indexAction() : \Account\Account
	{
		return $this->account;
	}
	
	public function signOutAction(Request $request, ModuleConfig $config) : \Account\Account
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$name = $config->get(Config::SESSION_NAME);
		unset($_SESSION[$name]);
		
		return $this->loader->load();
	}
}