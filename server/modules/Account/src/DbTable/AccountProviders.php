<?php
namespace Account\DbTable;

use Account\DbModel\AccountProvider,
	Database\Driver\MySQL\AbstractTable;

class AccountProviders extends AbstractTable
{
	const NAME = "account_providers";
	
	public function getName(): string { return self::NAME; }
	
	public function getModelClass() : string { return AccountProvider::class; }
	
	public function getPrimaryKeys() : array { return ["id"]; }
	
	/**
	 * Attempt to load a provider.  If a record cannot be found, a new 
	 * instance will be created using the $name and $token
	 * values.
	 * 
	 * @param string $name The name of the provider
	 * @param string $token The token used to identify the account from the provider
	 * @return AccountProvider
	 */
	public function load(string $name, string $token) : AccountProvider 
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`name` = :name AND
					`token` = :token
		");
		$statement->execute([
			":name" => $name,
			":token" => $token
		]);
		$provider = $statement->fetchObject(AccountProvider::class);
		
		if ($provider === false) {
			$provider = new  AccountProvider([
				"name" => $name,
				"token" => $token
			]);
		}
		
		return $provider;
	}
	
	/**
	 * Insert or update an account provider record
	 * 
	 * @param AccountProvider $provider
	 * @return AccountProvider
	 */
	public function save(AccountProvider $provider) : AccountProvider
	{
		$provider->updated = time();
		
		if ($provider->id) {
			$this->update([
				"updated" => $provider->updated
			], [
				"id" => $provider->id
			]);
		} else {
			$provider->created = time();
			$provider->id = $this->insert([
				"accountId" => $provider->accountId,
				"name" => $provider->name,
				"token" => $provider->token,
				"created" => $provider->created,
				"updated" => $provider->updated
			]);
		}
		
		return $provider;
	}
}
