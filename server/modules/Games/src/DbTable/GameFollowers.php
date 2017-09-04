<?php
namespace Games\DbTable;

use Account\Account,
	Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Games\Model;

class GameFollowers extends AbstractTable 
{
	public function getModelClass(): string { return Model\GameFollower::class; }

	public function getName(): string { return "game_followers"; }

	public function getPrimaryKeys(): array { return ["gameId", "accountId"]; }
	
	/**
	 * Determine if an account is following any of the provided games
	 * 
	 * @param Model\Game[] $games
	 * @param Account $account
	 */
	public function isFollowing(array $games, Account $account)
	{
		$gameMap = [];
		foreach ($games as $game) {
			$gameMap[$game->id] = $game;
		}
		
		$followers = $this->fetchAll(new QueryParams([
			"gameId" => array_keys($gameMap),
			"accountId" => $account->id
		]));
		
		foreach ($followers as $follower) {
			if (isset($gameMap[$follower->gameId])) {
				$gameMap[$follower->gameId]->following = true;
			}
		}
	}
}
