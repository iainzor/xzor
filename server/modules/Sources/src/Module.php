<?php
namespace Sources;

use Core\AbstractApplication,
	Core\BootableModuleInterface,
	Core\ModuleDefinition,
	Core\DI,
	Http\RouteProviderInterface,
	Http\Router;

class Module implements BootableModuleInterface, RouteProviderInterface
{
	public function bootstrap(AbstractApplication $app) 
	{
		$app->di()->register(SourceRegistry::class, function() use ($app) {
			$registry = new SourceRegistry();
			
			$app->moduleRegistry()->each(function(ModuleDefinition $moduleDef) use ($app, $registry) {
				$module = $moduleDef->instance($app);
				
				if ($module instanceof SourceProviderInterface) {
					$module->registerSource($registry, $app->di());
				}
			});
			
			return $registry;
		});
	}
	
	public function registerRoutes(Router $router) 
	{
		$router->when("/^sources$/i")
			->module("sources")
			->controller("sources")
			->action("list");
		
		$router->when("/^sources\/([a-z0-9-_]+)\/?([a-z0-9-_]+)?$/i")
			->module("sources")
			->controller("source")
			->action("index")
			->params([
				1 => "slug",
				2 => "action"
			]);
		
		$router->when("/^sources\/([a-z0-9-_]+)\/([a-z0-9-_]+)\/([a-z0-9-_]+)$/i")
			->module("sources")
			->controller("source-service")
			->action("load")
			->params([
				1 => "slug",
				2 => "service",
				3 => "id"
			]);
	}
}
