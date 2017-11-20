<?php
namespace Forums;

use Http\Router,
	Http\RouteProviderInterface;

class Module implements RouteProviderInterface 
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^forums\/([a-z0-9-_]+)\/([a-z0-9-_]+)$/i")
			->module("forums")
			->controller("forums-controller")
			->action("list")
			->params([
				1 => "resource",
				2 => "resourceId"
			]);
	}
}