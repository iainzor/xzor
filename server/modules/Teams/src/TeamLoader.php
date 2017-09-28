<?php
namespace Teams;

use Account\Account,
	Database\Query\QueryParams,
	Database\Query\QueryExpr;

class TeamLoader
{
	/**
	 * @var Account
	 */
	private $account;
	
	/**
	 * @var DbTable\Teams
	 */
	private $teams;
	
	/**
	 * @var DbTable\TeamThemes
	 */
	private $themes;
	
	/**
	 * @var DbTable\TeamMembers
	 */
	private $members;
	
	/**
	 * Constructor
	 * 
	 * @param Account $account
	 * @param \Teams\DbTable\Teams $teams
	 * @param \Teams\DbTable\TeamThemes $themes
	 * @param \Teams\DbTable\TeamMembers $members
	 */
	public function __construct(Account $account, DbTable\Teams $teams, DbTable\TeamThemes $themes, DbTable\TeamMembers $members)
	{
		$this->account = $account;
		$this->teams = $teams;
		$this->themes = $themes;
		$this->members = $members;
	}
	
	/**
	 * Load all teams
	 * 
	 * @param array $params
	 * @return array
	 */
	public function loadAll(TeamSearchParams $params = null) : array
	{
		if ($params === null) {
			$params = new TeamSearchParams();
		}
		
		$teams = $this->teams->fetchAll(
			$this->generateQueryParams($params)
		);
		
		return $this->_processAll($teams);
	}
	
	/**
	 * Load a team by its ID
	 * 
	 * @param int $id
	 * @return \Teams\DbModel\Team
	 */
	public function loadById(int $id) : DbModel\Team
	{
		$team = $this->teams->fetchById($id);
		
		return $this->_process($team);
	}
	
	/**
	 * Load a team by its slug
	 * 
	 * @param string $slug
	 * @return \Teams\DbModel\Team
	 */
	public function loadBySlug(string $slug) : DbModel\Team
	{
		$team = $this->teams->fetchBySlug($slug);
		
		return $this->_process($team);
	}
	
	private function generateQueryParams(TeamSearchParams $params) : QueryParams 
	{
		$db = $this->teams->getDb();
		$conditions = [];
		
		if ($params->q) {
			$conditions[] = new QueryExpr("`name` LIKE ". $db->quote("%{$params->q}%"));
		}
		
		if ((bool) $params->myTeams) {
			$conditions[] = new QueryExpr("
				(
					SELECT	`id` 
					FROM	`team_members` AS `m` 
					WHERE	`m`.`accountId` = ". $db->quote($this->account->id) ."
						AND	`m`.`teamId` = `teams`.`id`
				) IS NOT NULL
			");
		}
		
		return new QueryParams($conditions);
	}
	
	/**
	 * Process a team model
	 * 
	 * @param \Teams\DbModel\Team $team
	 * @return \Teams\DbModel\Team
	 */
	private function _process(DbModel\Team $team) : DbModel\Team
	{
		$this->_processAll([$team]);
		
		return $team;
	}
	
	/**
	 * Process a set of teams
	 * 
	 * @param array $teams
	 * @return array
	 */
	private function _processAll(array $teams) : array
	{
		$this->themes->attachToAll($teams);
		$this->members->determineMembership($this->account, $teams);
		
		return $teams;
	}
}
