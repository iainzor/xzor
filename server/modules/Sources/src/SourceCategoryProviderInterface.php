<?php
namespace Sources;

interface SourceCategoryProviderInterface
{
	public function registerSourceCategory(SourceCategoryRegistry $registry);
}
