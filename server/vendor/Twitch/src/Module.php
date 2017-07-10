<?php
namespace Twitch;

use Core\DI,
	Core\ConfigurableModuleInterface,
	Core\ModuleConfig,
	Core\AbstractApplication,
	Feed\ProviderDefinitionInterface,
	Games\Feed\GameFeedProviderInterface;

class Module implements ConfigurableModuleInterface, GameFeedProviderInterface
{
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(new Config(
			$config->get(Config::BASE_URL),
			$config->get(Config::CLIENT_ID)
		));
	}
	
	public function generateGameFeedProvider(DI $di) : ProviderDefinitionInterface 
	{
		return $di->create(Feed\GameFeedProviderDefinition::class);
	}
}