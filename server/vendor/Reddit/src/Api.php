<?php
namespace Reddit;

class Api
{
	const BASE_URL = "https://www.reddit.com";
	
	/**
	 * @var \Reddit\UserAgent
	 */
	protected $agent;
	
	/**
	 * Constructor
	 * 
	 * @param \Reddit\UserAgent $agent
	 */
	public function __construct(UserAgent $agent)
	{
		$this->agent = $agent;
	}
	
	/**
	 * Execute a GET request to the provided URI
	 * 
	 * @param string $uri
	 * @return array
	 * @throws \Exception
	 */
	public function get(string $uri) : array
	{
		$url = $this->url($uri);
		$ch = curl_init($url);
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 3,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTPHEADER => [
				"User-Agent: ". $this->agent->toString()
			]
		]);
		
		$response = curl_exec($ch);
		$error = curl_error($ch);
		curl_close($ch);
		
		if (!empty($error)) {
			throw new \Exception("API Error: {$error}");
		}
		
		if (empty($response)) {
			throw new \Exception("No response from reddit");
		}
		
		return json_decode($response, true) ?: [];
	}
	
	/**
	 * Generate a full URL for the provided URI
	 *  
	 * @param string $uri
	 * @return string
	 */
	public function url(string $uri) : string
	{
		return self::BASE_URL ."/". ltrim($uri, "/");
	}
}