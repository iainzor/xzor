<?php
namespace Account;

class AccountSaver
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
	 * @param \Account\DbTable\AccountData $accountData
	 * @param \Account\DbTable\AccountThemes $themes
	 */
	public function __construct(DbTable\Accounts $accounts, DbTable\AccountData $accountData, DbTable\AccountThemes $themes)
	{
		$this->accounts = $accounts;
		$this->accountData = $accountData;
		$this->themes = $themes;
	}
	
	/**
	 * Save changes to an account instance
	 * 
	 * @param \Account\Account $account
	 * @param array $data
	 * @throws \Exception
	 */
	public function save(Account $account, array $data)
	{
		if (!$account->id) {
			throw new \Exception("Cannot save an account without an ID");
		}
		
		$this->accounts->update([
			"name" => $data["name"],
			"slug" => $data["slug"],
			"isPublic" => (int) $data["isPublic"],
			"updated" => time()
		], [
			"id" => $account->id
		]);
		
		if (isset($data["data"])) {
			$this->accountData->saveForAccount($account->id, $data["data"]);
		}
		
		if (isset($data["theme"])) {
			$this->themes->save($account->id, $data["theme"]);
		}
	}
}