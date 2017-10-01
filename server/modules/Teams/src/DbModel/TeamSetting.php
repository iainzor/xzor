<?php
namespace Teams\DbModel;

use Database\Model\AbstractModel;

class TeamSetting extends AbstractModel 
{
	public $teamId;
	public $key;
	public $value;
}
