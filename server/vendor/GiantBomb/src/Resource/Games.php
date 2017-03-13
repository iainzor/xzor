<?php
namespace GiantBomb\Resource;

use GiantBomb\Model\Game;

class Games extends AbstractResource
{
	/**
	 * Perform a search query and result any games found
	 * 
	 * @param string $query
	 * @return Game[]
	 */
	public function search(string $query) : array
	{
		$response = $this->api->get("games", [
			"filter" => "name:". $query,
			"limit" => 12,
			"sort" => "original_release_date:desc",
			"field_list" => "id,name,deck,image"
		]);
		
		return array_map(function(array $result) {
			return new Game($result);
		}, $response->results);
	}
}
