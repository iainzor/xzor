<?php
namespace Account;

use Http\RouteProviderInterface,
	Http\Router;

class Module implements RouteProviderInterface
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^account\/verify\/([a-z0-9-]+)$/i")
			->module("account")
			->controller(function(array $matches) {
				return "verify-". $matches[1];
			})
			->action("verify")
			->params([
				1 => "service"
			]);
	}

}