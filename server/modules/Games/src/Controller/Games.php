<?php
namespace Games\Controller;

class Games
{
	public function listAction()
	{	
		return [
			[
				"id" => 1,
				"title" => "For Honor"
			], 
			[
				"id" => 2,
				"title" => "Battlefield 1"
			]
		];
	}
}
