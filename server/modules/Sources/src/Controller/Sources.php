<?php
namespace Sources\Controller;

use Sources\SourceRegistry;

class Sources
{
	public function listAction(SourceRegistry $registry)
	{
		return $registry->all();
	}
}
