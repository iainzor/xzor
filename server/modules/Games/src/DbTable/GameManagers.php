<?php
namespace Games\DbTable;

use Account\Account,
	Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Games\Model\GameManager;

class GameManagers extends AbstractTable
{
	public function getModelClass(): string { return GameManager::class; }

	public function getName(): string { return "game_managers"; }

	public function getPrimaryKeys(): array { return ["gameId", "accountId"]; }
	
	/**
	 * Find all manager records matching the provider gameIds and account
	 * 
	 * @param int[] $gameIds
	 * @param Account $account
	 * @return \Games\Model\GameManager[]
	 */
	public function findForGames(array $gameIds, Account $account) : array
	{
		if (empty($gameIds)) {
			return [];
		}
		
		return $this->fetchAll(new QueryParams([
			"gameId" => $gameIds,
			"accountId" => $account->id
		]));
	}
}
