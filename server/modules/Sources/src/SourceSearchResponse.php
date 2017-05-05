<?php
namespace Sources;

class SourceSearchResponse implements \JsonSerializable
{
	/**
	 * @var SourceInterface
	 */
	private $source;
	
	/**
	 * @var string
	 */
	private $q;
	
	/**
	 * @var array
	 */
	private $results = [];
	
	/**
	 * Constructor
	 * 
	 * @param SourceInterface $source
	 * @param string $q
	 */
	public function __construct(SourceInterface $source, string $q) {
		$this->source = $source;
		$this->q = $q;
	}
	
	/**
	 * Add results for a specific category
	 * 
	 * @param string $category
	 * @param array $results
	 */
	public function addResults(ServiceResultsInterface $results) {
		$this->results[$results->slug()] = $results->results();
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() {
		return [
			"q" => $this->q,
			"source" => $this->source,
			"results" => $this->results
		];
	}
}
