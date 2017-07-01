<?php
namespace Account\DbTable;

use UI\DbTable\AbstractThemeTable;

class AccountThemes extends AbstractThemeTable
{	
	public function getName(): string { return "account_themes"; }
	
	public function getIdColumnName() : string { return "accountId"; }
	
	public function getDefaultBackground() : string { return "#455A64"; }
	
	public function getDefaultText() : string { return "#ffffff"; }
}