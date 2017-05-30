<?php
namespace Sources;

use Core\DI;

interface SourceProviderInterface
{
	public function registerSource(SourceRegistry $registry, DI $di);
}