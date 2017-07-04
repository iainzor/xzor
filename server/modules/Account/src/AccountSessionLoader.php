<?php
namespace Account;

class AccountSessionLoader
{
	/**
	 * @var \Account\DbTable\AccountSessions
	 */
	private $sessions;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\DbTable\AccountSessions $sessions
	 */
	public function __construct(DbTable\AccountSessions $sessions)
	{
		$this->sessions = $sessions;
	}
	
	/**
	 * Attempt to load an existing account session
	 * 
	 * @param string $sessionName
	 * @param int $sessionLifetime
	 * @return \Account\DbModel\AccountSession
	 */
	public function load(string $sessionName, int $sessionLifetime) : DbModel\AccountSession
	{
		$sessionId = filter_input(INPUT_COOKIE, $sessionName);
		
		if (empty($sessionId)) {
			$sessionId = isset($_SESSION[$sessionName]) ? $_SESSION[$sessionName] : "";
		}
		
		return $this->sessions->load($sessionId, $sessionLifetime);
	}
}