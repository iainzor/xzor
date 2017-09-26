<?php
namespace Account;

use Database\Query\QueryParams;

class AccountLoader
{
	/**
	 * @var \Account\DbTable\Accounts
	 */
	private $accounts;
	
	/**
	 * @var \Account\DbTable\AccountData
	 */
	private $accountData;
	
	/**
	 * @var \Account\DbTable\AccountThemes
	 */
	private $themes;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\DbTable\Accounts $accounts
	 * @param \Account\DbTable\AccountData $accountData,
	 * @param \Account\DbTable\AccountThemes $themes
	 */
	public function __construct(
		DbTable\Accounts $accounts,
		DbTable\AccountData $accountData,
		DbTable\AccountThemes $themes
	)
	{
		$this->accounts = $accounts;
		$this->accountData = $accountData;
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
			$all = $this->loadAll(new QueryParams([
				"id" => $id
			], [], 1));
			
			if (count($all) > 0) {
				$account = array_shift($all);
			}
		}
		
		if (!isset($account)) {
			$account = new Account();
		}
		
		return $account;
	}
	
	/**
	 * Load all accounts matching the query parameters
	 * 
	 * @param QueryParams $params
	 * @return \Account\Account[]
	 */
	public function loadAll(QueryParams $params) : array
	{
		$all = array_map(function($record) {
			return new Account((array) $record);
		}, $this->accounts->fetchAll($params));
		
		$this->process($all);
		
		return $all;
	}
	
	/**
	 * Load all public profiles
	 * 
	 * @param QueryParams $params
	 * @return \Account\Account[]
	 */
	public function loadPublicProfiles(QueryParams $params = null) : array
	{
		if ($params === null) {
			$params = new QueryParams();
		}
		$params->conditions["isPublic"] = true;
		
		return $this->loadAll($params);
	}
	
	/**
	 * Load a single public profile by its slug
	 * 
	 * @param string $slug
	 * @return \Account\Account
	 * @throws \Exception
	 */
	public function loadPublicProfile(string $slug) : Account
	{
		$all = $this->loadPublicProfiles(new QueryParams([
			"slug" => $slug
		]));
		
		if (!count($all)) {
			throw new \Exception("Could not load public profile for '{$slug}'");
		}
		
		return array_shift($all);
	}
	
	/**
	 * Load and attach all related components to the account instance
	 * 
	 * @param \Account\DbModel\Account $account
	 */
	private function process(array $accounts)
	{
		if (empty($accounts)) {
			return;
		}
		
		$this->themes->attachToAll($accounts);
		
		$ids = array_map(function($account) { return $account->id; }, $accounts);
		$idMap = array_combine($ids, $accounts);
		$data = $this->accountData->fetchAll(new QueryParams([
			"accountId" => $ids
		]));
		
		foreach ($data as $datum) {
			$account = $idMap[$datum->accountId];
			
			if (!$account->data) {
				$account->data = new AccountDataSet();
			}
			
			$account->data->set($datum);
		}
	}
}
