<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class Account extends AbstractModel 
{
	public $id;
	public $name;
	public $created;
	public $updated;
}
