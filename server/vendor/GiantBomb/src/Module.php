<?php
namespace GiantBomb;

use Core\AbstractApplication,
	Core\BootableModuleInterface,
	Core\ConfigurableModuleInterface,
	Core\DI,
	Core\ModuleConfig,
	Sources\SourceContainer,
	Sources\SourceProviderInterface,
	Sources\SourceRegistry;

class Module implements BootableModuleInterface, ConfigurableModuleInterface, SourceProviderInterface
{
	/**
	 * @var AbstractApplication
	 */
	private $app;
	
	public function bootstrap(AbstractApplication $app) 
	{
		$this->app = $app;
	}
	
	public function configure(AbstractApplication $app, ModuleConfig $config) 
	{
		$app->di()->register(Api::class, function() use ($config) {
			return new Api(
				$config->get(Config::API_KEY),
				$config->get(Config::API_USER_AGENT)
			);
		});
	}
	
	public function registerSource(SourceRegistry $registry, DI $di) 
	{
		$di->call(function(Source $source) use ($registry) {
			$registry->register(
				new SourceContainer($source, [
					"games" => GamesSourceService::class
				])
			);
		});
	}
}
