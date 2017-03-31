<?php
namespace UI;

class Theme
{
	public $background;
	public $border;
	public $color;
	
	/**
	 * Constructor
	 * 
	 * @param string $background
	 * @param string $border
	 * @param string $color
	 */
	public function __construct(string $background, string $border, string $color)
	{
		$this->background = $background;
		$this->border = $border;
		$this->color = $color;
	}
}