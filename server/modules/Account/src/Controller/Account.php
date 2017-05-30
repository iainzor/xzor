<?php
namespace Account\Controller;

use Account\DbModel,
	Account\AccountLoader,
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
	 * @var \Account\DbModel\Account
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
	 * @return \Account\DbModel\Account
	 */
	public function indexAction() : DbModel\Account
	{
		return $this->account;
	}
	
	public function signOutAction(Request $request, ModuleConfig $config) : DbModel\Account 
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		$name = $config->get(Config::SESSION_NAME);
		unset($_SESSION[$name]);
		
		return $this->loader->load();
	}
}