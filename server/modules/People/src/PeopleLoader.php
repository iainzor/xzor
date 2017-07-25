<?php
namespace People;

use Account\DbTable\Accounts,
	Account\DbTable\AccountThemes;

class PeopleLoader
{
	/**
	 * @var Accounts
	 */
	private $accounts;
	
	/**
	 * @var AccountThemes
	 */
	private $accountThemes;
	
	/**
	 * Constructor
	 * 
	 * @param Accounts $accounts
	 * @param AccountThemes $accountThemes
	 */
	public function __construct(Accounts $accounts, AccountThemes $accountThemes)
	{
		$this->accounts = $accounts;
		$this->accountThemes = $accountThemes;
	}
	
	/**
	 * @return array
	 */
	public function loadAll() : array
	{
		$people = $this->accounts->fetchPublicProfiles();
		
		$this->accountThemes->attachToAll($people);
		
		return $people;
	}
	
	public function load(string $slug)
	{
		$person = $this->accounts->fetchPublicProfile($slug);
		
		$this->accountThemes->attachToAll([$person]);
		
		return $person;
	}
}