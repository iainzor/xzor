<?php
namespace People\Controller;

use Http\Route,
	People\PeopleLoader;

class Person
{
	public function indexAction(PeopleLoader $loader, Route $route)
	{
		$slug = $route->param("slug");
		
		try {
			return $loader->load($slug);
		} catch (\Exception $e) {
			throw new \Exception("Could not find public profile for '{$slug}'", 404);
		}
	}
}