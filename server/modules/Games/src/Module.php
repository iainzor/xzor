<?php
namespace Games;

use Http\Router,
	Http\RouteProviderInterface,
	Sources\SourceCategoryRegistry,
	Sources\SourceCategoryProviderInterface;

class Module implements RouteProviderInterface, SourceCategoryProviderInterface
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^games$/i")
			->module("games")
			->controller("games")
			->action("list");
		
		$router->when("/^import-game$/i")
			->module("games")
			->controller("games")
			->action("import");

		$router->when("/^games\/([a-z0-9-]+)\/?([a-z0-9-]+)?$/i")
			->params([
				1 => "slug",
				2 => "action"
			])
			->module("games")
			->controller("game")
			->action("index");
	}
	
	public function registerSourceCategory(SourceCategoryRegistry $registry)
	{
		$registry->register("games", function(GameSources $sources) {
			return $sources;
		});
	}
}
