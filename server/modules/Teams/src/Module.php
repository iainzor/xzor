<?php
namespace Teams;

use Account\Permission,
	Core\AbstractApplication,
	Core\ConfigurableModuleInterface,
	Core\ModuleConfig,
	Http\RouteProviderInterface,
	Http\Router;

class Module implements ConfigurableModuleInterface, RouteProviderInterface, Permission\PermissionProviderInterface
{
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(Settings\Registry::class, function(DbTable\TeamSettings $teamSettings) use ($config) {
			$registry = new Settings\Registry($teamSettings);
			$settings = $config->get(Config::SETTINGS, []);
			
			foreach ($settings as $key => $setting) {
				$registry->register(
					new Settings\SettingDefinition($key, $setting)
				);
			}
			
			return $registry;
		});
	}
	
	public function registerRoutes(Router $router) 
	{
		$router->when("/^teams\/?([a-z0-9-]+)?/i")
			->module("teams")
			->controller("teams-controller")
			->action("list")
			->params([
				1 => "action"
			]);
		
		$router->when("/^t\/([a-z0-9-_]+)\/?([a-z0-9-_]+)?/i")
			->module("teams")
			->controller("team-controller")
			->action("index")
			->params([
				1 => "slug",
				2 => "action"
			]);
		
		$router->when("/^t\/([a-z0-9-_]+)\/manage\/([a-z0-9-_]+)?/i")
			->module("teams")
			->controller("team-manager-controller")
			->action("index")
			->params([
				1 => "slug",
				2 => "action"
			])
			->weight(1);
	}
	
	public function provideAccountPermissions(Permission\PermissionRegistry $registry) 
	{
		$registry->registerResourceProvider(TeamPermissionProvider::class);
		$registry->registerResourceProvider(TeamsPermissionProvider::class);
	}
}