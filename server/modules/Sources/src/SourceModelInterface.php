<?php
namespace Sources;

use UI\ThemeInterface;

interface SourceModelInterface
{
	public function setSourceTheme(ThemeInterface $theme);
	public function getSourceTheme() : ThemeInterface;
}