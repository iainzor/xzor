<?php
namespace UI;

class Theme implements ThemeInterface
{
	use ThemeTrait;
	
	public function __construct(string $background, string $text)
	{
		$this->background = $background;
		$this->text = $text;
	}
}
