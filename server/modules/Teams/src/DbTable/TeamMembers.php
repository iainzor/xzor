<?php
namespace Teams\DbTable;

use Account\Account,
	Account\Permission\PermissionCollection,
	Account\Permission\PermissionDefinition,
	Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Teams\DbModel;

class TeamMembers extends AbstractTable
{
	public function getModelClass(): string { return DbModel\TeamMember::class; }

	public function getName(): string { return "team_members"; }

	public function getPrimaryKeys(): array { return ["id"]; }
	
	/**
	 * Determine if an account is a member of any of the teams provided
	 * 
	 * @param Account $account
	 * @param DbModel\Team[] $teams
	 */
	public function determineMembership(Account $account, array $teams)
	{
		if (count($teams) > 0) {
			$ids = array_map(function(DbModel\Team $team) { return $team->id; }, $teams);
			$map = array_combine($ids, $teams);
			$members = $this->fetchAll(new QueryParams([
				"accountId" => $account->id,
				"teamId" => $ids
			]));

			foreach ($members as $member) {
				$team = $map[$member->teamId];
				$member->setTeam($team);
				
				$team->member = $member;
			}
		}
	}
	
	public function populatePermissions(PermissionCollection $permissions, DbModel\Team $team, Account $account)
	{
		$membership = $this->fetch(new QueryParams([
			"accountId" => $account->id,
			"teamId" => $team->id
		]));
		
		if ($membership && $membership->isAdmin) {
			$permissions->allowAll = true;
		} else if (!$membership && $account->isValid) {
			$permissions->add(new PermissionDefinition("join", true));
		}
	}
}
