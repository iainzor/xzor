<?php
namespace Games\Controller;

use Games\GamesLoader,
	Http\Request;

class Games
{
	public function listAction(GamesLoader $loader, Request $request) : array
	{	
		return $loader->load(
			(string) $request->inputGet("q")
		);
	}
}
