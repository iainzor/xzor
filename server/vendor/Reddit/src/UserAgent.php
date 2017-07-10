<?php
namespace Reddit;

class UserAgent
{
	/**
	 * @var string
	 */
	public $platform;
	
	/**
	 * @var string
	 */
	public $appId;
	
	/**
	 * @var string
	 */
	public $version;
	
	/**
	 * @var string
	 */
	public $username;
	
	/**
	 * Constructor
	 * 
	 * @param string $platform
	 * @param string $appId
	 * @param string $version
	 * @param string $username
	 */
	public function __construct(
		string $platform,
		string $appId,
		string $version,
		string $username
	) {
		$this->platform = $platform;
		$this->appId = $appId;
		$this->version = $version;
		$this->username = $username;
	}
	
	public function toString() : string
	{
		return $this->platform .":". $this->appId .":v". $this->version ." (by /u/". $this->username .")";
	}
}