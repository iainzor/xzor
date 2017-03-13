<?php
namespace Games;

use Core\BootableModuleInterface,
	Http\Router;

class Module implements BootableModuleInterface
{
	public static function bootstrap(\Core\AbstractApplication $app) 
	{
		$app->di()->call(function(Router $router) {
			$router->when("/^games$/i")
				->module("games")
				->controller("games")
				->action("list");
			
			$router->when("/^games\/([a-z0-9-]+)\/?([a-z0-9-]+)?$/i")
				->params([
					1 => "slug",
					2 => "action"
				])
				->module("games")
				->controller("game")
				->action("index");
		});
	}
}
