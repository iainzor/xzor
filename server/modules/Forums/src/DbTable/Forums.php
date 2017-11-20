<?php
namespace Forums\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Forums\DbModel;

class Forums extends AbstractTable 
{
	public function getModelClass() : string { return DbModel\Forum::class; }

	public function getName() : string { return "forums"; }

	public function getPrimaryKeys() : array { return ["id"]; }
}