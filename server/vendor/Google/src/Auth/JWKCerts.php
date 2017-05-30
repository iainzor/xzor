<?php
namespace Google\Auth;

class JWKCerts
{
	const URL = "https://www.googleapis.com/oauth2/v3/certs";
	
	/**
	 * @var array
	 */
	private $certs;
	
	/**
	 * Get a list of all available certificates
	 * 
	 * @return array
	 * @throws \Exception
	 */
	public function certs() : array
	{
		if (!isset($this->certs)) {
			$ch = curl_init(self::URL);
			curl_setopt_array($ch, [
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_SSL_VERIFYHOST =>  false,
				CURLOPT_SSL_VERIFYPEER => false
			]);
			$response = curl_exec($ch);
			$error = curl_error($ch);
			
			curl_close($ch);
			
			if (strlen($error)) {
				throw new \Exception("cURL error: {$error}");
			}
			
			$data = json_decode($response, true);
			$this->certs = $data && isset($data["keys"])
				? $data["keys"]
				: [];
		}
		
		return $this->certs;
	}
	
	/**
	 * Check if a cert exists for the given algorithm and kid
	 * 
	 * @param string $alg
	 * @param string $kid
	 * @return bool
	 */
	public function isValid(string $alg, string $kid) : bool
	{
		foreach ($this->certs() as $cert) {
			if ($cert["alg"] === $alg && $cert["kid"] === $kid) {
				return true;
			}
		}
		return false;
	}
}
