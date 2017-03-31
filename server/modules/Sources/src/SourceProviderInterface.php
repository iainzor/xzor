<?php
namespace Sources;

interface SourceProviderInterface
{
	public function registerSource(SourceRegistry $registry);
}