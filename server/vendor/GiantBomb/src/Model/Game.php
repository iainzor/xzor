<?php
namespace GiantBomb\Model;

use Common\StringOperations,
	Games\Model\Game as XzorGame,
	GiantBomb\Source;

class Game extends AbstractModel
{
	public $id;
	public $name;
	public $deck;
	public $description;
	public $lastUpdated;
	public $image = [];
	
	public function coverImage() : string {
		return isset($this->image["small_url"]) ? $this->image["small_url"] : "";
	}
	
	public function generateXzorGame() : XzorGame {
		$stringOps = new StringOperations();
		
		
		return new XzorGame([
			"slug" => $stringOps->hyphenate($this->name),
			"title" => $this->name,
			"description" => $this->deck,
			"coverImage" => $this->coverImage(),
			"source" => Source::SLUG,
			"sourceId" => $this->id
		]);
	}
}