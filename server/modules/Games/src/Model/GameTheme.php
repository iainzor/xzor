<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class GameTheme extends AbstractModel implements \UI\ThemeInterface
{
	use \UI\ThemeTrait;
	
	/**
	 * @var int
	 */
	public $gameId = 0;
}
