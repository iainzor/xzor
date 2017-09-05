<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class AccountSession extends AbstractModel
{
	/**
	 * @var string
	 */
	public $id;
	
	/**
	 * @var int
	 */
	public $accountId;
	
	/**
	 * @var int
	 */
	public $created;
	
	/**
	 * Override the default constructor to set the default created time
	 * 
	 * @param array $properties
	 * @param array $map
	 */
	public function __construct(array $properties = [], array $map = []) 
	{
		parent::__construct($properties, $map);
		
		if (!$this->created) {
			$this->created = time();
		}
	}
}