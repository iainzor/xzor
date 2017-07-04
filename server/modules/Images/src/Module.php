<?php
namespace Images;

use Http\Router,
	Http\RouteProviderInterface;

class Module implements RouteProviderInterface
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^img\/upload\.json$/i")
			->module("images")
			->controller("images")
			->action("upload");
		
		$router->when("/^img\/([a-z0-9]+)\.([a-z0-9]+)$/i")
			->module("images")
			->controller("image")
			->action("display")
			->params([
				1 => "slug",
				2 => "format"
			]);
	}
}