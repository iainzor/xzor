<?php
namespace Teams;

use Database\Query\QueryParams;

class TeamMemberLoader
{
	/**
	 *
	 * @var DbModel\Team
	 */
	private $team;
	
	/**
	 * @var DbTable\TeamMembers
	 */
	private $membersTable;
	
	/**
	 * @param \Teams\DbModel\Team $team
	 * @param \Teams\DbTable\TeamMembers $membersTable
	 */
	public function __construct(DbModel\Team $team, DbTable\TeamMembers $membersTable) 
	{
		$this->team = $team;
		$this->membersTable = $membersTable;
	}
	
	/**
	 * @return DbModel\TeamMember[]
	 */
	public function loadAll() : array
	{
		$members = $this->membersTable->fetchAll(new QueryParams([
			"teamId" => $this->team->id
		]));
		
		foreach ($members as $member) {
			$member->setTeam($this->team);
		}
		
		return $members;
	}
}
