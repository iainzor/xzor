<?php
namespace Account;

class Account extends DbModel\Account
{
	/**
	 * @var AccountDataSet
	 */
	public $data;
	
	/**
	 * @var \UI\ThemeInterface
	 */
	public $theme;
	
	public function __construct(array $properties = array(), array $map = array()) 
	{
		parent::__construct($properties, $map);
		
		if (!isset($this->data)) {
			$this->data = new AccountDataSet();
		}
	}
}