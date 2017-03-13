<?php
namespace GiantBomb;

use Core\ConfigurableModuleInterface;

class Module implements ConfigurableModuleInterface
{
	public function configure(\Core\AbstractApplication $app, \Core\ModuleConfig $config) 
	{
		$app->di()->register(Api::class, function() use ($config) {
			return new Api(
				$config->get(Config::API_KEY),
				$config->get(Config::API_USER_AGENT)
			);
		});
	}
}
