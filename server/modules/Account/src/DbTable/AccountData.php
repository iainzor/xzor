<?php
namespace Account\DbTable;

use Account\AccountDataSet,
	Account\DbModel\AccountDatum,
	Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams;

class AccountData extends AbstractTable
{
	public function getModelClass(): string { return AccountDatum::class; }

	public function getName(): string { return "account_data"; }

	public function getPrimaryKeys(): array { return ["accountId", "key"]; }
	
	/**
	 * @param int $accountId
	 * @return \Account\DbTable\AccountDataSet
	 */
	public function fetchForAccount(int $accountId) : AccountDataSet
	{
		return new AccountDataSet(
			$this->fetchAll(new QueryParams([
				"accountId" => $accountId
			]))
		);
	}
	
	/**
	 * Save all data values for an account
	 * 
	 * @param int $accountId
	 * @param array $data
	 */
	public function saveForAccount(int $accountId, array $data)
	{
		foreach ($data as $key => $value) {
			$this->insert([
				"accountId" => $accountId,
				"key" => $key,
				"value" => $value
			], ["value"]);
		}
	}
}