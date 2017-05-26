<?php
namespace Account;

use Acl\Acl,
	Acl\Role,
	Acl\RoleProviderInterface,
	Http\RouteProviderInterface,
	Http\Router;

class Module implements RouteProviderInterface, RoleProviderInterface
{
	public function registerRoutes(Router $router) 
	{
		$router->when("/^account\/?([a-z0-9-_]+)?$/i")
			->module("account")
			->controller("account")
			->action("index")
			->params([
				1 => "action"
			]);
		
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
	
	public function registerAclRoles(Acl $acl) 
	{
		$acl->addRoles([
			new Role(Config::ROLE_GUEST),
			new Role(Config::ROLE_USER),
			new Role(Config::ROLE_ADMIN)
		]);
	}
}