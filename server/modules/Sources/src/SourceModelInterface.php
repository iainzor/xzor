<?php
namespace Sources;

use UI\Theme;

interface SourceModelInterface
{
	public function setSourceTheme(Theme $theme);
	public function getSourceTheme() : Theme;
}