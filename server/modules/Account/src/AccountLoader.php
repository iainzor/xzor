<?php
namespace Account;

use Core\ModuleConfig;

class AccountLoader
{
	/**
	 * @var ModuleConfig
	 */
	private $config;
	
	/**
	 * @var \Account\DbTable\Accounts
	 */
	private $accounts;
	
	/**
	 * @var \Account\DbTable\AccountSessions
	 */
	private $sessions;
	
	/**
	 * @var \Account\DbTable\AccountThemes
	 */
	private $themes;
	
	/**
	 * Constructor
	 * 
	 * @param \Core\ModuleConfig $config
	 * @param \Account\DbTable\Accounts $accounts
	 * @param \Account\DbTable\AccountSessions $sessions
	 * @param \Account\DbTable\AccountThemes $themes
	 */
	public function __construct(
		ModuleConfig $config, 
		DbTable\Accounts $accounts, 
		DbTable\AccountSessions $sessions,
		DbTable\AccountThemes $themes
	)
	{
		$this->config = $config;
		$this->accounts = $accounts;
		$this->sessions = $sessions;
		$this->themes = $themes;
	}
	
	/**
	 * Attempt to load a user's account from an existing session.  If a session
	 * does not exists, or is invalid, a guest account instance will be returned.
	 * 
	 * @return \Account\Account
	 */
	public function load() : Account
	{
		$sessionName = $this->config->get(Config::SESSION_NAME);
		$lifetime = $this->config->get(Config::SESSION_LIFETIME);
		$sessionId = filter_input(INPUT_COOKIE, $sessionName);
		
		if (empty($sessionId)) {
			$sessionId = isset($_SESSION[$sessionName]) ? $_SESSION[$sessionName] : "";
		}
		
		$session = $this->sessions->load($sessionId, $lifetime);
		
		if ($session->id) {
			$model = $this->accounts->load($session->accountId);
			$account = new Account((array) $model);
		}
		
		if (!isset($account)) {
			$account = new Account();
		}
		
		$this->_attachComponents($account);
		
		return $account;
	}
	
	/**
	 * Load and attach all related components to the account instance
	 * 
	 * @param \Account\DbModel\Account $account
	 */
	private function _attachComponents(DbModel\Account $account)
	{
		$account->theme = $this->themes->load($account->id);
	}
}
