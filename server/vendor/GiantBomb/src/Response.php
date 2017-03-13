<?php
namespace GiantBomb;

class Response
{
	public $error = "OK";
	public $limit = 100;
	public $offset = 0;
	public $numberOfPageResults = 0;
	public $numberOfTotalResults = 0;
	public $statusCode;
	public $results = [];
	
	public function __construct(
		string $error, 
		int $limit,
		int $offset,
		int $numberOfPageResults,
		int $numberOfTotalResults,
		int $statusCode,
		array $results
	) {
		$this->error = $error;
		$this->limit = $limit;
		$this->offset = $offset;
		$this->numberOfPageResults = $numberOfPageResults;
		$this->numberOfTotalResults = $numberOfTotalResults;
		$this->statusCode = $statusCode;
		$this->results = $results;
	}
	
	public static function generate(string $rawResponse) : self
	{
		$responseData = json_decode($rawResponse, true);
		$values = array_values($responseData);
		
		list($error, $limit, $offset, $numberOfPageResults, $numberOfTotalResults, $statusCode, $results) = $values;
		
		return new self($error, $limit, $offset, $numberOfPageResults, $numberOfTotalResults, $statusCode, $results);
	}
}