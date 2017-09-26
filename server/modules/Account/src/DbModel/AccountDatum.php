<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class AccountDatum extends AbstractModel
{
	public $accountId;
	public $key;
	public $value;
}
