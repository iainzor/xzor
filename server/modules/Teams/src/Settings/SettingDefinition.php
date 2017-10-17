<?php
namespace Teams\Settings;

class SettingDefinition
{
	use \Common\PopulatePropertiesTrait;
	
	public $key;
	public $label;
	public $description;
	public $defaultValue;
	public $fieldType = "text";
	public $options;
	public $conditions = null;
	
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
	
	/**
	 * Determine if a setting is valid
	 * 
	 * @param mixed $value
	 * @param array $settings
	 * @return bool
	 */
	public function isValid($value, array $settings = []) : bool
	{
		$conditionsMatch = true;
		$isValid = true;
		
		if (!empty($this->conditions)) {
			foreach ($this->conditions as $key => $expected) {
				$actual = isset($settings[$key]) ? $settings[$key] : null;
				
				if ($actual !== $expected) {
					$conditionsMatch = false;
				}
			}
		}
		
		if ($this->isRequired && $conditionsMatch && empty($value)) {
			$isValid = false;
		}
		
		return $isValid;
	}
}
