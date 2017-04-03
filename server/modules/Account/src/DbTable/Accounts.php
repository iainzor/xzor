<?php
namespace Account\DbTable;

use Account\DbModel\Account,
	Account\DbModel\AccountService,
	Database\Driver\MySQL\AbstractTable;

class Accounts extends AbstractTable
{
	const NAME = "accounts";
	
	public function getName() : string { return self::NAME; }
	
	/**
	 * Create a new account record
	 * 
	 * @param $name The name for the account
	 * @return Account
	 */
	public function create(string $name) : Account 
	{
		$accountId = $this->insert([
			"name" => $name,
			"created" => time(),
			"updated" => time()
		]);

		return $this->load($accountId);
	}
	
	/**
	 * Attempt to load an account by it's ID
	 * 
	 * @param int $id
	 * @return Account
	 * @throws \Exception
	 */
	public function load(int $id) : Account
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`id` = :id
		");
		$statement->execute([
			":id" => $id
		]);
		$account =  $statement->fetchObject(Account::class);
		
		if ($account === false) {
			throw new \Exception("Could not load account");
		}
		
		return $account;
	}
}
