<?php
namespace Games;

use Core\ConfigurableModuleInterface,
	Core\AbstractApplication,
	Core\ModuleConfig,
	Core\ModuleDefinition,
	Http\Router,
	Http\RouteProviderInterface,
	Sources\SourceCategoryRegistry,
	Sources\SourceCategoryProviderInterface;

class Module implements ConfigurableModuleInterface, RouteProviderInterface, SourceCategoryProviderInterface
{
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(Feed\GameFeedDefinition::class, function() use ($app) {
			$feedDef = new Feed\GameFeedDefinition();
			
			$app->moduleRegistry()->each(function(ModuleDefinition $moduleDef) use ($app, $feedDef) {
				$instance = $moduleDef->instance($app);
				
				if ($instance instanceof Feed\GameFeedProviderInterface) {
					$provider = $instance->generateGameFeedProvider($app->di());
					$feedDef->addProvider($provider);
				}
			});
			
			return $feedDef;
		});
	}
	
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

		$router->when("/^g\/([a-z0-9-]+)\/?([a-z0-9-]+)?$/i")
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
