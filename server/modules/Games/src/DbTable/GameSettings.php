<?php
namespace Games\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Database\Query\QueryParams,
	Games\Model\GameSetting,
	Games\GameSettingsContainer,
	Games\Model\Game;

class GameSettings extends AbstractTable 
{
	public function getModelClass(): string { return GameSetting::class; }

	public function getName(): string { return "game_settings"; }
	
	public function getPrimaryKeys() : array { return ["gameId", "key"]; }
	
	/**
	 * @param Game $game
	 * @return GameSettingsContainer
	 */
	public function findForGame(Game $game) : GameSettingsContainer
	{
		return new GameSettingsContainer(
			$this->fetchAll(new QueryParams([
				"gameId" => $game->id
			]))
		);
	}
}