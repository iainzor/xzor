<?php
namespace Teams\DbModel;

use Database\Model\AbstractModel,
	UI\ThemeInterface,
	UI\ThemeTrait;

class TeamTheme extends AbstractModel implements ThemeInterface
{
	use ThemeTrait;
	
	public $teamId;
}
