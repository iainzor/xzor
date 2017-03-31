<?php
namespace Games\DbModel;

use Database\Model\AbstractModel;

class Game extends AbstractModel
{
	public $id;
	public $title;
	public $slug;
	public $description;
}