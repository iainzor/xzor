<?php
namespace Reddit;

use Core\DI,
	Core\AbstractApplication,
	Core\ConfigurableModuleInterface,
	Core\ModuleConfig,
	Feed\ProviderDefinitionInterface,
	Games\Feed\GameFeedProviderInterface;

class Module implements ConfigurableModuleInterface, GameFeedProviderInterface
{
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(Api::class, function() use ($app, $config) {
			$agent = new UserAgent(
				$config->get(Config::AGENT_PLATFORM),
				$config->get(Config::AGENT_APP_ID),
				$config->get(Config::AGENT_VERSION),
				$config->get(Config::AGENT_USERNAME)
			);
			
			return new Api($agent);
		});
	}
	
	public function generateGameFeedProvider(DI $di) : ProviderDefinitionInterface
	{
		return $di->create(Feed\GameFeedProvider::class);
	}

}