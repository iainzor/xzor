<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class GameFollower extends AbstractModel
{
	public $gameId;
	public $accountId;
	public $created;
}
