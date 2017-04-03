<?php
namespace Account\DbTable;

use Account\DbModel\AccountService,
	Database\Driver\MySQL\AbstractTable;

class AccountServices extends AbstractTable
{
	const NAME = "account_services";
	
	public function getName(): string { return self::NAME; }
	
	/**
	 * Attempt to load a service record.  If a record cannot be found, a new 
	 * instance will be created using the $serviceName and $serviceAccountId
	 * values.
	 * 
	 * @param string $serviceName
	 * @param string $serviceAccountId
	 * @return AccountService
	 */
	public function load(string $serviceName, string $serviceAccountId) : AccountService 
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`serviceName` = :serviceName AND
					`serviceAccountId` = :serviceAccountId
		");
		$statement->execute([
			":serviceName" => $serviceName,
			":serviceAccountId" => $serviceAccountId
		]);
		$service = $statement->fetchObject(AccountService::class);
		
		if ($service === false) {
			$service = new  AccountService([
				"serviceName" => $serviceName,
				"serviceAccountId" => $serviceAccountId
			]);
		}
		
		return $service;
	}
	
	/**
	 * Insert or update an account service record
	 * 
	 * @param AccountService $service
	 * @return AccountService
	 */
	public function save(AccountService $service) : AccountService
	{
		$service->updated = time();
		
		if ($service->id) {
			$this->update([
				"updated" => $service->updated
			], [
				"id" => $service->id
			]);
		} else {
			$service->created = time();
			$service->id = $this->insert([
				"accountId" => $service->accountId,
				"serviceName" => $service->serviceName,
				"serviceAccountId" => $service->serviceAccountId,
				"created" => $service->created,
				"updated" => $service->updated
			]);
		}
		
		return $service;
	}
}
