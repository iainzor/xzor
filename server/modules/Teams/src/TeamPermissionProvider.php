<?php
namespace Teams;

use Account\Account,
	Account\Permission\ResourceProviderInterface,
	Account\Permission\PermissionCollection;

class TeamPermissionProvider implements ResourceProviderInterface
{
	/**
	 * @var DbTable\Teams
	 */
	private $teams;
	
	/**
	 * @var DbTable\TeamMembers
	 */
	private $teamMembers;
	
	/**
	 * Constructor
	 * 
	 * @param \Teams\DbTable\Teams $teams
	 * @param \Teams\DbTable\TeamMembers $teamMembers
	 */
	public function __construct(DbTable\Teams $teams, DbTable\TeamMembers $teamMembers)
	{
		$this->teams = $teams;
		$this->teamMembers = $teamMembers;
	}
	
	public function getResource() : string { return "team"; }
	
	public function requiresResourceId() : bool { return true; }
	
	/**
	 * 
	 * @param PermissionCollection $permissions
	 * @param Account $account
	 * @param string $resourceId
	 */
	public function providePermissions(PermissionCollection $permissions, Account $account, string $resourceId = null) 
	{
		$team = $this->teams->fetchBySlug($resourceId);
		$this->teamMembers->populatePermissions($permissions, $team, $account);
	}
}
