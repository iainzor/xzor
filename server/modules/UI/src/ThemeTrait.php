<?php
namespace UI;

trait ThemeTrait
{
	public $background;
	public $text;
	
	public function getBackground() { return $this->background; }
	
	public function getText() { return $this->text; }
}