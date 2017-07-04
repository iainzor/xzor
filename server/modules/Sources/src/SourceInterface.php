<?php
namespace Sources;

use UI\Theme;

interface SourceInterface extends \JsonSerializable
{
	public function slug() : string;
	
	public function name() : string;
	
	public function website() : string;
	
	public function theme() : Theme;
	
	public function loader() : SourceLoaderInterface;
}