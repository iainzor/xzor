<?php
namespace GiantBomb\Model;

class Game extends AbstractModel
{
	public $id;
	public $name;
	public $deck;
	public $description;
	public $lastUpdated;
	public $image = [];
}