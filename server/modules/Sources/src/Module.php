<?php
namespace Sources;

use Core\AbstractApplication,
	Core\BootableModuleInterface,
	Core\ModuleDefinition,
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
					$module->registerSource($registry);
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
	}
}
