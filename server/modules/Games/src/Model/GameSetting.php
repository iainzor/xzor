<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class GameSetting extends AbstractModel
{
	public $gameId;
	public $key;
	public $value;
	
	public function getPrimaryKeys() : array { return ["gameId", "key"]; }
}