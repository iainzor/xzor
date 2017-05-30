<?php
namespace Google;

use Core\ConfigurableModuleInterface;

class Module implements ConfigurableModuleInterface
{
	public function configure(\Core\AbstractApplication $app, \Core\ModuleConfig $config) 
	{
		$app->di()->register(Auth\Verifier::class, function() use ($config) {
			$clientId = $config->get(Config::AUTH_CLIENT_ID);
			$certs = new Auth\JWKCerts();
			
			return new Auth\Verifier($clientId, $certs);
		});
	}
}
