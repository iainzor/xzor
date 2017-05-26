<?php
namespace Account\Controller;

use Acl\Acl,
	Account\Config;

class Account
{
	public function indexAction(Acl $acl)
	{
		return [
			"role" => $acl->getRole(Config::ROLE_GUEST)
		];
	}
}