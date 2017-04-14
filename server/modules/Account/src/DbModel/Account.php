<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class Account extends AbstractModel 
{
	public $id;
	public $name;
	public $created;
	public $updated;
	public $isValid = false;
	
	public function __construct(array $properties = array(), array $map = array()) {
		parent::__construct($properties, $map);
		
		$this->isValid = (boolean) $this->isValid;
	}
}
