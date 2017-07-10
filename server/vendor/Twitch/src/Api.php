<?php
namespace Twitch;

class Api
{
	/**
	 * @var Config
	 */
	private $config;
	
	/**
	 * Constructor
	 * 
	 * @param \Twitch\Config $config
	 */
	public function __construct(Config $config)
	{
		$this->config = $config;
	}
	
	public function get(string $uri, array $params = []) : array
	{
		$url = $this->url($uri) ."?". http_build_query($params);
		$ch = curl_init($url);
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_HTTPHEADER => [
				"Accept: application/vnd.twitchtv.v5+json",
				"Client-ID: ". $this->config->clientId
			]
		]);
		
		$response = curl_exec($ch);
		$error = curl_error($ch);
		curl_close($ch);
		
		if (!empty($error)) {
			throw new \Exception("API Error: {$error}");
		}
		
		return json_decode($response, true);
	}
	
	/**
	 * @param string $uri
	 * @return string
	 */
	public function url(string $uri) : string
	{
		return $this->config->baseUrl ."/". ltrim($uri, "/");
	}
}