<?php
namespace Teams;

use Account\Permission,
	Http\RouteProviderInterface,
	Http\Router;

class Module implements RouteProviderInterface, Permission\PermissionProviderInterface
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^teams\/?(new|my-teams)?/i")
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
	}
	
	public function provideAccountPermissions(Permission\PermissionRegistry $registry) 
	{
		$registry->registerResourceProvider(TeamPermissionProvider::class);
		$registry->registerResourceProvider(TeamsPermissionProvider::class);
	}
}