<?php
namespace People\Controller;

use People\PeopleLoader;

class People
{
	public function listAction(PeopleLoader $loader) : array
	{
		return $loader->loadAll();
	}
}