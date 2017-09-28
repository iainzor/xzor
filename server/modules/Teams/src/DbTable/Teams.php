<?php
namespace Teams\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Teams\DbModel;

class Teams extends AbstractTable 
{
	public function getModelClass(): string { return DbModel\Team::class; }

	public function getName(): string { return "teams"; }

	public function getPrimaryKeys(): array { return ["id"]; }
	
	/**
	 * Fetch a team by their ID
	 * 
	 * @param int $id
	 * @return \Teams\DbModel\Team
	 * @throws \Exception
	 */
	public function fetchById(int $id) : DbModel\Team
	{
		$team = $this->fetch(new QueryParams([
			"id" => $id
		]));
		
		if (!$team) {
			throw new \Exception("Could not find team by ID #{$id}");
		}
		
		return $team;
	}
	
	/**
	 * Fetch a team by their slug
	 * 
	 * @param string $slug
	 * @return \Teams\DbModel\Team
	 * @throws \Exception
	 */
	public function fetchBySlug(string $slug) : DbModel\Team
	{
		$team = $this->fetch(new QueryParams([
			"slug" => $slug
		]));
		
		if (!$team) {
			throw new \Exception("Could not find team by the slug '{$slug}'");
		}
		
		return $team;
	}
}
