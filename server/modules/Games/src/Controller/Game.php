<?php
namespace Games\Controller;

use Games\DbTable,
	Http\Route;

class Game
{
	public function indexAction(DbTable\Games $games, Route $route)
	{
		return $games->find($route->param("slug"));
	}
}