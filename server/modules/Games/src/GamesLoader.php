<?php
namespace Games;

use Account\Account,
	Database\Query\QueryExpr,
	Database\Query\QueryParams;

class GamesLoader
{
	/**
	 * @var Account
	 */
	private $account;
	
	/**
	 * @var DbTable\Games
	 */
	private $gamesTable;
	
	/**
	 * @var DbTable\GameFollowers
	 */
	private $followersTable;
	
	/**
	 * @var Roles\RoleAssigner
	 */
	private $roleAssigner;
	
	/**
	 * @var GameImageLoader
	 */
	private $imageLoader;
	
	/**
	 *
	 * @var GameThemeLoader
	 */
	private $themeLoader;
	
	/**
	 * Constructor
	 * 
	 * @param \Account\Account $account
	 * @param \Games\DbTable\Games $gamesTable
	 * @param \Games\DbTable\GameFollowers $followersTable
	 * @param \Games\Roles\RoleAssigner $roleAssigner
	 * @param \Games\GameImageLoader $imageLoader
	 * @param \Games\GameThemeLoader $themeLoader
	 */
	public function __construct(
		Account $account,
		DbTable\Games $gamesTable,
		DbTable\GameFollowers $followersTable,
		Roles\RoleAssigner $roleAssigner,
		GameImageLoader $imageLoader,
		GameThemeLoader $themeLoader
	) {
		$this->account = $account;
		$this->gamesTable = $gamesTable;
		$this->followersTable = $followersTable;
		$this->roleAssigner = $roleAssigner;
		$this->imageLoader = $imageLoader;
		$this->themeLoader = $themeLoader;
	}
	
	/**
	 * Search for games matching a set of parameters
	 * 
	 * @param array $conditions
	 * @param int $maxResults
	 * @param int $resultOffset
	 */
	public function loadList(array $params = [], int $maxResults = 24, int $resultOffset = 0) : array
	{
		$conditions = [];
		$orderings = ["`title` ASC"];
		$inputParams = [];
		
		if (isset($params["q"])) {
			$q = $params["q"];
			$conditions[] = new QueryExpr("`slug` LIKE :slug OR `title` LIKE :title");
			$inputParams[":slug"] = $q ."%";
			$inputParams[":title"] = "%". $q ."%";
		}
		
		if (isset($params["following"]) && $this->account->isValid) {
			$value = (bool) $params["following"] ? "IS NOT NULL" : "IS NULL";
			$conditions[] = new QueryExpr("(
				SELECT f.gameId 
				FROM `game_followers` AS `f` 
				WHERE f.accountId = :accountId AND f.gameId = games.id
			) {$value}");
			$inputParams[":accountId"] = $this->account->id;
		}
		
		$queryParams = new QueryParams($conditions, $orderings, $maxResults, $resultOffset);
		$games = $this->gamesTable->fetchAll($queryParams, $inputParams);
		
		return $this->process($queryParams, $games);
	}
	
	/**
	 * Load a single game by its slug
	 * 
	 * @param string $slug
	 * @return \Games\Model\Game
	 */
	public function load(string $slug) : Model\Game
	{
		$params = new QueryParams([
			"slug" => $slug
		]);
		
		$game = $this->gamesTable->fetch($params);
		
		$this->process($params, [$game]);
		
		return $game;
	}
	
	/**
	 * @param QueryParams $params
	 * @param Model\Game[] $games
	 * @return Model\Game[]
	 */
	private function process(QueryParams $params, array $games) : array
	{
		$this->followersTable->isFollowing($games, $this->account);
		$this->roleAssigner->assignAll($games, $this->account);
		$this->imageLoader->attachCoverImages($games);
		$this->themeLoader->attachThemes($games);
		
		return $games;
	}
}