<?php
namespace Account\DbModel;

use Database\Model\AbstractModel;

class Account extends AbstractModel 
{
	public $id;
	public $name;
	public $slug;
	public $created;
	public $updated;
	public $isValid = false;
	public $isPublic = false;
	
	public function __construct(array $properties = array(), array $map = array()) {
		parent::__construct($properties, $map);
		
		$this->isValid = (boolean) $this->isValid;
		$this->isPublic = (boolean) $this->isPublic;
		
		if (empty($this->created)) {
			$this->created = time();
		}
	}
	
	public function getPrimaryKeys() : array { return ["id"]; }
}
