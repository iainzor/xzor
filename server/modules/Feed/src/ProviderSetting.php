<?php
namespace Feed;

class ProviderSetting
{
	public $name;
	public $label;
	public $description;
	public $value;
	
	/**
	 * Constructor
	 * 
	 * @param string $name
	 * @param string $label
	 * @param string $description
	 */
	public function __construct(string $name, string $label, string $description) 
	{
		$this->name = $name;
		$this->label = $label;
		$this->description = $description;
	}
	
	/**
	 * Set the value of the setting
	 * 
	 * @param mixed $value
	 */
	public function setValue($value)
	{
		$this->value = $value;
	}
}
