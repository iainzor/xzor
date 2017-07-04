<?php
namespace UI;

class Theme implements ThemeInterface
{
	use ThemeTrait;
	
	public function __construct(string $background = null, string $text = null)
	{
		if ($background !== null) {
			$this->background = $background;
		}
		if ($text !== null) {
			$this->text = $text;
		}
	}
}
