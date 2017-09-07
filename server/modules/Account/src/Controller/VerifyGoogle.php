<?php
namespace Account\Controller;

use Http\Request,
	Google\Auth\Verifier;

class VerifyGoogle extends AbstractVerifier
{
	/**
	 * @var Verifier
	 */
	private $verifier;
	
	/**
	 * Constructor
	 * 
	 * @param Verifier $verifier
	 */
	public function __construct(Verifier $verifier)
	{
		$this->verifier = $verifier;
	}
	
	/**
	 * Verify a JSON web token for a google account
	 * 
	 * @param Request $request
	 */
	public function isValid(Request $request) : bool
	{
		$token = $request->json()->get("token");
		$valid = false;
		
		try {
			$valid = $this->verifier->verify($token);
		} catch (\Exception $e) {
			$valid = false;
		}
		
		return $valid;
	}
	
	public function getAccountId() : string 
	{
		return $this->verifier->userId();
	}
	
	public function getAccountName() : string
	{
		return $this->verifier->userName();
	}
}