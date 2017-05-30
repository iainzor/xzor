<?php
namespace Sources;

class SourceRegistry
{
	/**
	 *
	 * @var SourceContainer[]
	 */
	private $sources = [];
	
	/**
	 * Register a new source
	 * 
	 * @param \Sources\SourceContainer $source
	 */
	public function register(SourceContainer $source) {
		$this->sources[$source->source()->slug()] = $source;
	}
	
	/**
	 * @return SourceContainer[]
	 */
	public function all() : array {
		return array_values($this->sources);
	}
	
	/**
	 * @param string $slug
	 * @return \Sources\SourceContainer
	 * @throws \Exception
	 */
	public function get(string $slug) : SourceContainer {
		if (!isset($this->sources[$slug])) {
			throw new \Exception("Invalid source: {$slug}");
		}
		return $this->sources[$slug];
	}
}
