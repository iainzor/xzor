<?php
namespace Games\Controller;

use Games\GamesLoader,
	Http\Request;

class Games
{
	public function listAction(GamesLoader $loader, Request $request) : array
	{	
		sleep(1);
		return $loader->load(
			$request->inputGet("q")
		);
	}
}
