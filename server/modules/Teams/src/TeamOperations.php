<?php
namespace Teams;

use Account\Account;

class TeamOperations
{
	/**
	 * @var DbTable\TeamMembers
	 */
	private $members;
	
	/**
	 * Constructor
	 * 
	 * @param DbTable\TeamMembers $members
	 */
	public function __construct(DbTable\TeamMembers $members)
	{
		$this->members = $members;
	}
	
	/**
	 * Make an account the admin a team.  This will clear the current admin.
	 * 
	 * @param Account $account
	 * @param \Teams\DbModel\Team $team
	 * @param string $name
	 */
	public function makeAdmin(Account $account, DbModel\Team $team, $name = null)
	{
		try {
			$this->members->getDb()->beginTransaction();
			$this->members->update([
				"isAdmin" => false
			], [
				"teamId" => $team->id
			]);
			$this->members->insert([
				"teamId" => $team->id,
				"accountId" => $account->id,
				"name" => $name !== null ? $name : $account->name,
				"isAdmin" => true
			], [
				"isAdmin"
			]);
			$this->members->getDb()->commit();
		} catch (\Exception $e) {
			$this->members->getDb()->rollBack();
			throw $e;
		}
	}
}
