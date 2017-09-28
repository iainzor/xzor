<?php
namespace People;

use Account\AccountLoader,
	Account\DbTable\Accounts,
	Account\DbTable\AccountThemes;

class PeopleLoader
{
	/**
	 * @var AccountLoader
	 */
	private $loader;
	
	/**
	 * Constructor
	 * 
	 * @param AccountLoader $loader
	 */
	public function __construct(AccountLoader $loader)
	{
		$this->loader = $loader;
	}
	
	/**
	 * @return array
	 */
	public function loadAll() : array
	{
		return $this->loader->loadPublicProfiles();
	}
	
	public function load(string $slug)
	{
		return $this->loader->loadPublicProfile($slug);
	}
}