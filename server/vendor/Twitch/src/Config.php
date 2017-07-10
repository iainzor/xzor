<?php
namespace Twitch;

class Config
{
	const BASE_URL = "twitch.api.baseUrl";
	const CLIENT_ID = "twitch.api.appId";
	
	public $baseUrl;
	public $clientId;
	
	/**
	 * Constructor
	 * 
	 * @param string $baseUrl
	 * @param string $clientId
	 */
	public function __construct(string $baseUrl, string $clientId)
	{
		$this->baseUrl = $baseUrl;
		$this->clientId = $clientId;
	}
}