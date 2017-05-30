<?php
namespace Sources\Controller;

use Http\Request,
	Http\Route,
	Sources\SourceRegistry;

class Source
{
	/**
	 *
	 * @var \Sources\SourceContainer
	 */
	private $source;
	
	public function __construct(SourceRegistry $sources, Route $route)
	{
		$this->source = $sources->get(
			$route->param("slug")
		);
	}
	
	public function indexAction()
	{
		return $this->source;
	}
	
	public function routeAction()
	{
		return $this->source;
	}
	
	public function searchAction(Request $request)
	{
		$q = $request->inputGet("q");
		$response = $this->source->source()->loader()->find($q);
		
		return $response;
	}
}