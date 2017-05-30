<?php
namespace GiantBomb;

class Api
{
	const BASE_URL = "http://www.giantbomb.com/api";
	
	/**
	 * @var string
	 */
	private $apiKey;
	
	/**
	 * @var string
	 */
	private $userAgent;
	
	/**
	 * Constructor
	 * 
	 * @param string $apiKey
	 */
	public function __construct(string $apiKey, string $userAgent)
	{
		$this->apiKey = $apiKey;
		$this->userAgent = $userAgent;
	}
	
	public function getRaw(string $url) : string
	{
		$ch = $this->curl($url);
		$response = curl_exec($ch);
		$error = curl_error($ch);
		curl_close($ch);
		
		if ($error) {
			throw new ApiException("GiantBomb API Error: {$error}");
		}
		
		return $response;
	}
	
	public function get(string $uri, array $params = []) : Response
	{
		$ch = $this->curl(
			$this->_generateUrl($uri, $params)
		);
		$response = curl_exec($ch);
		$error = curl_error($ch);
		curl_close($ch);
		
		if ($error) {
			throw new ApiException("GiantBomb API Error: {$error}");
		}
		
		return Response::generate($response);
	}
	
	private function curl($url)
	{
		$ch = curl_init($url);
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_HTTPHEADER => [
				"User-Agent: ". $this->userAgent
			]
		]);
		
		return $ch;
	}
	
	/**
	 * 
	 * @param string $uri
	 * @param array $params
	 * @return string
	 */
	private function _generateUrl(string $uri, array $params = []) : string
	{
		$params = array_merge($params, [
			"format" => "json",
			"api_key" => $this->apiKey
		]);
		
		return self::BASE_URL ."/". $uri ."?". http_build_query($params);
	}
}
