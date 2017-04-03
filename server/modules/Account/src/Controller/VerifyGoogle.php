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
	 * @var Accounts
	 */
	private $accounts;
	
	/**
	 * Constructor
	 * 
	 * @param Verifier $verifier
	 * @param Accounts $accounts
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
		
		try {
			$this->verifier->verify($token);
		} catch (\Exception $e) {
			return false;
		}
		
		return true;
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