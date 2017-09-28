<?php
namespace Teams\DbTable;

use Teams\DbModel,
	UI\DbTable\AbstractThemeTable;

class TeamThemes extends AbstractThemeTable
{
	public function getDefaultBackground(): string { return "#ffffff"; }

	public function getDefaultText(): string { return "#212121"; }

	public function getIdColumnName(): string { return "teamId"; }

	public function getModelClass(): string { return DbModel\TeamTheme::class; }

	public function getName(): string { return "team_themes"; }

	public function getPrimaryKeys(): array { return ["teamId"]; }
}
