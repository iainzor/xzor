<?php
namespace Games;

use Core\BootableModuleInterface,
	Http\Request,
	Http\Router;

class Module implements BootableModuleInterface
{
	public static function bootstrap(\Core\AbstractApplication $app) 
	{
		$app->di()->call(function(Router $router) {
			$router->when("/^games/i")
				->module("games")
				->controller("games")
				->action("list");
		});
	}
}
