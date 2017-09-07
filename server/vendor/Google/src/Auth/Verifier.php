<?php
namespace Google\Auth;

class Verifier
{
	const ISSUER = "accounts.google.com";
	
	/**
	 * @var string
	 */
	private $clientId;
	
	/**
	 * @var string
	 */
	private $userId;
	
	/**
	 * @var string
	 */
	private $userName;
	
	/**
	 * @var JWKCerts
	 */
	private $certs;
	
	/**
	 * Constructor
	 * 
	 * @param string $clientId
	 * @param JWKCerts $certs
	 */
	public function __construct(string $clientId, JWKCerts $certs)
	{
		$this->clientId = $clientId;
		$this->certs = $certs;
	}
	
	/**
	 * Verify a token to make sure it hasn't been modified
	 * 
	 * @param string $token
	 * @throws \Exception
	 * @return bool
	 */
	public function verify(string $token) : bool
	{
		$parts = explode(".", $token);
		
		if (count($parts) < 3) {
			throw new \Exception("Invalid token string provided");
		}
		
		$header = json_decode(base64_decode($parts[0]), true);
		$payload = json_decode(base64_decode($parts[1]), true);
		$clientId = $payload["aud"];
		$issuer = $payload["iss"];
		$expireTime = $payload["exp"];
		
		if (!$this->certs->isValid($header["alg"], $header["kid"])) {
			throw new \Exception("Could not verify certificate");
		}
		
		if ($clientId !== $this->clientId) {
			throw new \Exception("Client ID from the token does not match the local config value");
		}
		
		if (!preg_match("/". preg_quote(self::ISSUER) ."$/i", $issuer)) {
			throw new \Exception("Issuer of the token is invalid");
		}
		
		if ($expireTime <= time()) {
			throw new \Exception("Token expired at ". date("Y-m-d H:i:s", $expireTime));
		}
		
		$this->userId = $payload["sub"];
		$this->userName = $payload["name"];
		
		return true;
	}
	
	/**
	 * Get the user's ID if they have been verified
	 * 
	 * @return string
	 * @throws \Exception
	 */
	public function userId() : string
	{
		if (!isset($this->userId)) {
			throw new \Exception("No user has been verified yet");
		}
		
		return $this->userId;
	}
	
	/**
	 * Get the verified user's name
	 * 
	 * @return string
	 * @throws \Exception
	 */
	public function userName() : string
	{
		if (!isset($this->userName)) {
			throw new \Exception("No user has been verified yet");
		}
		return $this->userName;
	}
}