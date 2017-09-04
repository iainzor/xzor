<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class GameManager extends AbstractModel
{
	public $gameId;
	public $accountId;
	public $role;
}
