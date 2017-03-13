<?php
namespace GiantBomb\Resource;

use GiantBomb\Model;

class Game extends AbstractResource 
{
	const RESOURCE_ID = 3030;
	
	public function load(int $id, array $fields = null) : Model\Game
	{
		if ($fields === null) {
			$fields = ["id", "name", "deck", "image"];
		}
		
		$response = $this->api->get("game/". self::RESOURCE_ID ."-". $id, [
			"field_list" => implode(",", $fields)
		]);
		
		return new Model\Game($response->results, [
			"date_last_updated" => "lastUpdated"
		]);
	}
}
