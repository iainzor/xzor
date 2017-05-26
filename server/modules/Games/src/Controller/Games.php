<?php
namespace Games\Controller;

use Games\GamesLoader,
	Games\GameSaver,
	Http\Request;

class Games
{
	public function listAction(GamesLoader $loader, Request $request) : array
	{	
		return $loader->search(
			(string) $request->inputGet("q")
		);
	}
	
	public function importAction(GameSaver $saver, Request $request) : GameSaver
	{
		return $saver->save(
			$request->json()->data()
		);
	}
}
