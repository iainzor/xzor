<?php
namespace Sources;

use Core\DI;

class SourceContainer implements \JsonSerializable
{
	/**
	 * @var SourceInterface
	 */
	private $source;
	
	/**
	 * @var array
	 */
	private $services = [];
	
	/**
	 * @param \Sources\SourceInterface $source
	 * @param array $services
	 */
	public function __construct(SourceInterface $source, array $services = []) {
		$this->source = $source;
		$this->services = $services;
	}
	
	/**
	 * @return \Sources\SourceInterface
	 */
	public function source() : SourceInterface {
		return $this->source;
	}
	
	/**
	 * @param string $slug
	 * @param DI $di
	 * @return ServiceInterface
	 * @throws \Exception
	 */
	public function service(string $slug, DI $di) : ServiceInterface {
		if (!isset($this->services[$slug])) {
			throw new \Exception("Service '{$slug}' has not been added for source '". $this->source->name() ."'");
		}
		
		$service = $this->services[$slug];
		$instance = null;
		if (is_string($service)) {
			if (class_exists($service)) {
				$instance = $di->create($service);
			}
		} else if (is_callable($service)) {
			$instance = $di->call($service);
		} 
		
		if (!($instance instanceof ServiceInterface)) {
			throw new \Exception("Service registered under '{$slug}' must implement \\Sources\\ServiceInterface");
		}
		
		return $instance;
	}
	
	public function jsonSerialize() : array {
		return [
			"slug" => $this->source->slug(),
			"name" => $this->source->name(),
			"website" => $this->source->website(),
			"theme" => $this->source->theme()
		];
	}
}
