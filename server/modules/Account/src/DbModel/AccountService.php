<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class AccountService extends AbstractModel
{
	public $id;
	public $accountId;
	public $serviceName;
	public $serviceAccountId;
	public $created;
	public $updated;
}
