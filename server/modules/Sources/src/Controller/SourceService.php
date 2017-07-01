<?php
namespace Sources\Controller;

use Core\DI,
	Http\Route,
	Sources\SourceRegistry;

class SourceService
{
	/**
	 * @var SourceRegistry
	 */
	private $registry;
	
	/**
	 * @param SourceRegistry $registry
	 */
	public function __construct(SourceRegistry $registry) {
		$this->registry = $registry;
	}
	
	public function loadAction(Route $route, DI $di) {
		$slug = $route->param("slug");
		$serviceName = $route->param("service");
		$id = $route->param("id");
		
		$source = $this->registry->get($slug);
		$service = $source->service($serviceName, $di);
		$result = $service->load($id);
		
		$result->setSource($source->source());
		
		return $result;
	}
}