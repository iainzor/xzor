<?php
namespace GiantBomb\Resource;

use GiantBomb\Api;

abstract class AbstractResource
{
	/**
	 * @var Api
	 */
	protected $api;
	
	/**
	 * Constructor
	 * 
	 * @param Api $api
	 */
	public function __construct(Api $api) 
	{
		$this->api = $api;
	}
}
