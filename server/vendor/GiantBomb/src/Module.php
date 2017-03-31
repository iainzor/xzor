<?php
namespace GiantBomb;

use Core\AbstractApplication,
	Core\BootableModuleInterface,
	Core\ConfigurableModuleInterface,
	Core\ModuleConfig,
	Sources\SourceProviderInterface,
	Sources\SourceRegistry,
	Sources\Source,
	UI\Theme;

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
	
	public function registerSource(SourceRegistry $registry) 
	{
		$service = new SourceService();
		$theme = new Theme("#981616", "#981616", "#ffffff");
		$source = new Source("GiantBomb", "https://giantbomb.com", $service, $theme);
		
		$registry->register($source);
	}
}
