<?php
namespace Sources;

use UI\Theme;

interface SourceInterface
{
	public function slug() : string;
	
	public function name() : string;
	
	public function website() : string;
	
	public function theme() : Theme;
}