<?php
namespace Account;

use Core\AbstractApplication,
	Core\BootableModuleInterface,
	Core\ConfigurableModuleInterface,
	Core\ModuleConfig,
	Acl\Acl,
	Acl\Role,
	Acl\RoleProviderInterface,
	Http\RouteProviderInterface,
	Http\Router;

class Module implements BootableModuleInterface, ConfigurableModuleInterface, RouteProviderInterface, RoleProviderInterface
{
	public function bootstrap(AbstractApplication $app) 
	{
		$sessionId = session_id();
		if (empty($sessionId)) {
			session_start();
		}
	}
	
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(Account::class, function(AccountSessionLoader $sessionLoader, AccountLoader $accountLoader) use ($config) {
			$session = $sessionLoader->load(
				$config->get(Config::SESSION_NAME),
				$config->get(Config::SESSION_LIFETIME)
			);
			return $accountLoader->load($session->accountId);
		});
	}

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
			
		$router->when("/^sign-out\.json$/i")
			->module("account")
			->controller("account")
			->action("sign-out");
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