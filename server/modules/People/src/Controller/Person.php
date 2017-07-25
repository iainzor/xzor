<?php
namespace People\Controller;

use Http\Route,
	People\PeopleLoader;

class Person
{
	public function indexAction(PeopleLoader $loader, Route $route)
	{
		return $loader->load(
			$route->param("slug")
		);
	}
}