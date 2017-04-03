<?php
namespace Account;

class Session implements \JsonSerializable
{
	/**
	 * @var boolean
	 */
	private $isValid = false;
	
	/**
	 * @var DbModel\Account
	 */
	private $account;
	
	/**
	 * Set the account tied to this session
	 * 
	 * @param \Account\DbModel\Account $account
	 */
	public function setAccount(DbModel\Account $account)
	{
		$this->account = $account;
		$this->isValid = true;
	}
	
	public function jsonSerialize() 
	{
		return [
			"isValid" => $this->isValid,
			"account" => $this->account ?: null
		];
	}
}