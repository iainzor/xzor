<?php
namespace People;

use Http\RouteProviderInterface,
	Http\Router;

class Module implements RouteProviderInterface 
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^people$/")
			->module("people")
			->controller("people")
			->action("list");
		
		$router->when("/^p(erson)?\/([a-z0-9-_]+)$/i")
			->module("people")
			->controller("person")
			->action("index")
			->params([
				2 => "slug"
			]);
	}
}