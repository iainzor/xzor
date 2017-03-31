<?php
namespace Sources;

class SourceRegistry
{
	/**
	 *
	 * @var SourceInterface[]
	 */
	private $sources = [];
	
	/**
	 * Register a new source
	 * 
	 * @param \Sources\SourceInterface $source
	 */
	public function register(SourceInterface $source)
	{
		$this->sources[$source->slug()] = $source;
	}
	
	/**
	 * @return SourceInterface[]
	 */
	public function all() : array
	{
		return array_values($this->sources);
	}
}
