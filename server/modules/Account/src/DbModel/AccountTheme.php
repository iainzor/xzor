<?php
namespace Account\DbModel;

use Database\Model\AbstractModel,
	UI\ThemeTrait;

class AccountTheme extends AbstractModel 
{
	use ThemeTrait;
	
	public function getPrimaryKeys() : array { return ["accountId"]; }
}

