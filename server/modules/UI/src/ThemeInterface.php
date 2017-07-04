<?php
namespace UI;

interface ThemeInterface extends \JsonSerializable
{
	public function getBackground();
	
	public function getText();
}
