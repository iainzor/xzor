<?php
namespace Account;

class AccountLoader
{
	/**
	 * @var \Account\DbTable\Accounts
	 */
	private $accounts;
	
	
	/**
	 * @var \Account\DbTable\AccountThemes
	 */
	private $themes;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\DbTable\Accounts $accounts
	 * @param \Account\DbTable\AccountThemes $themes
	 */
	public function __construct(
		DbTable\Accounts $accounts, 
		DbTable\AccountThemes $themes
	)
	{
		$this->accounts = $accounts;
		$this->themes = $themes;
	}
	
	/**
	 * Attempt to load a user account.  If no ID is provided, a guest account
	 * instance will be returned.
	 * 
	 * @param int $id
	 * @return \Account\Account
	 */
	public function load(int $id = null) : Account
	{
		if ($id !== null) {
			$model = $this->accounts->load($id);
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
