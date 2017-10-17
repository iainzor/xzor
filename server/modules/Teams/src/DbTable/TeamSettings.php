<?php
namespace Teams\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Teams\DbModel\TeamSetting,
	Teams\DbModel\Team,
	Teams\Settings;

class TeamSettings extends AbstractTable
{
	public function getModelClass(): string { return TeamSetting::class; }

	public function getName(): string { return "team_settings"; }

	public function getPrimaryKeys(): array { return ["teamId", "key"]; }
	
	public function load(Team $team) : array
	{
		return $this->fetchAll(new QueryParams([
			"teamId" => $team->id
		]));
	}
}
