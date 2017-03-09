<?php
namespace Games\Controller;

use Games\DbTable,
	Http\Request;

class Games
{
	public function listAction(DbTable\Games $games, Request $request) : array
	{	
		return $games->findAll(
			$request->inputGet("q")
		);
	}
}
