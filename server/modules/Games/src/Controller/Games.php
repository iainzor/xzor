<?php
namespace Games\Controller;

use Database\Query\QueryParams,
	Database\Query\QueryExpr,
	Database\PDO,
	Games\GamesLoader,
	Games\GameSaver,
	Http\Request;

class Games
{
	public function listAction(PDO $db, GamesLoader $loader, Request $request) : array
	{	
		return $loader->loadList($request->inputGetAll(), 10);
	}
	
	public function addAction(GameSaver $saver, Request $request) : GameSaver
	{
		return $saver->save(
			$request->json()->data()
		);
	}
}
