<?php
namespace Xzor;

use Core\ConfigurableModuleInterface,
	Database\PDO;

class Module implements ConfigurableModuleInterface
{	
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