<?php
namespace Xzor;

use Core\ConfigurableModuleInterface,
	Core\BootableModuleInterface,
	Database\PDO;

class Module implements BootableModuleInterface, ConfigurableModuleInterface
{	
	public function bootstrap(\Core\AbstractApplication $app) 
	{
		$app->di()->call([$this, "boot"]);
	}
	
	public function boot(\Http\Router $router) {
		$router->when("/^blah$/i")
			->module("xzor")
			->controller("blah")
			->action("halb");
	}
	
	public function configure(\Core\AbstractApplication $app, \Core\ModuleConfig $config) 
	{
		$app->di()->register(PDO::class, function() use ($config) {
			$host = $config->get(Config::DB_HOST);
			$name = $config->get(Config::DB_NAME);
			$user = $config->get(Config::DB_USER);
			$password = $config->get(Config::DB_PASSWORD);
			$pdo = new PDO("mysql:host={$host};dbname={$name}", $user, $password, [
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			]);
			
			return $pdo;
		});
	}
}