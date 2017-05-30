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
	 * Constructor
	 * 
	 * @param \Core\ModuleConfig $config
	 * @param \Account\DbTable\Accounts $accounts
	 * @param \Account\DbTable\AccountSessions $sessions
	 */
	public function __construct(ModuleConfig $config, DbTable\Accounts $accounts, DbTable\AccountSessions $sessions)
	{
		$this->config = $config;
		$this->accounts = $accounts;
		$this->sessions = $sessions;
	}
	
	/**
	 * Attempt to load a user's account from an existing session.  If a session
	 * does not exists, or is invalid, a guest account instance will be returned.
	 * 
	 * @return \Account\DbModel\Account
	 */
	public function load() : DbModel\Account
	{
		$sessionName = $this->config->get(Config::SESSION_NAME);
		$lifetime = $this->config->get(Config::SESSION_LIFETIME);
		$sessionId = filter_input(INPUT_COOKIE, $sessionName);
		
		if (empty($sessionId)) {
			$sessionId = isset($_SESSION[$sessionName]) ? $_SESSION[$sessionName] : "";
		}
		
		$session = $this->sessions->load($sessionId, $lifetime);
		
		if ($session->id) {
			$account = $this->accounts->load($session->accountId);
		}
		
		if (!isset($account)) {
			$account = new DbModel\Account();
		}
		
		return $account;
	}
}
