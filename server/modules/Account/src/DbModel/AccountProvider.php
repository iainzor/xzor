<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class AccountProvider extends AbstractModel
{
	public $id;
	public $accountId;
	public $name;
	public $token;
	public $created;
	public $updated;
	
	public function getPrimaryKeys() : array { return ["id"]; }
}
