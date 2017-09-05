<?php
namespace Games\Roles;

use Account\Account,
	Games\DbTable\GameManagers,
	Games\Model\Game;

class RoleAssigner
{
	/**
	 * @var \Games\DbTable\GameManagers
	 */
	private $gameManagers;
	
	/**
	 * @var \Games\Roles\RolesRegistry
	 */
	private $rolesRegistry;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\GameManagers $gameManagers
	 * @param \Games\Roles\RolesRegistry $rolesRegistry
	 */
	public function __construct(GameManagers $gameManagers, RolesRegistry $rolesRegistry) 
	{
		$this->gameManagers = $gameManagers;
		$this->rolesRegistry = $rolesRegistry;
	}
	
	/**
	 * Assign roles for an account to all supplied games
	 * 
	 * @param \Games\Model\Game[] $games
	 * @param \Account\Account $account
	 */
	public function assignAll(array $games, Account $account)
	{
		$gameIdMap = [];
		foreach ($games as $game) {
			$gameIdMap[$game->id] = $game;
		}
		
		$managers = $this->gameManagers->findForGames(array_keys($gameIdMap), $account);
		
		foreach ($managers as $manager) {
			$game = $gameIdMap[$manager->gameId];
			$role = $this->rolesRegistry->get($manager->role);
			$game->role = $role;
		}
	}
}
