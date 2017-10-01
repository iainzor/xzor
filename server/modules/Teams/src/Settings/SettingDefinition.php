<?php
namespace Teams\Settings;

class SettingDefinition
{
	use \Common\PopulatePropertiesTrait;
	
	public $key;
	public $label;
	public $description;
	public $fieldType = "text";
	public $options;
	public $conditions = [];
	
	public $isRequired = true;
	public $isPublic = true;
	
	/**
	 * Constructor
	 * 
	 * @param string $key
	 * @param array $properties
	 */
	public function __construct(string $key, array $properties)
	{
		$this->key = $key;
		$this->populateProperties($properties);
	}
}
