<?php
namespace Feed;

use UI\ThemeInterface;

interface ProviderDefinitionInterface
{
	public function getName() : string;
	
	public function getTheme() : ThemeInterface;
	
	public function getCollector() : ProviderCollectorInterface;
}
