<?php
namespace Feed;

class ProviderSettings implements \JsonSerializable
{
	/**
	 * @var ProviderSetting[]
	 */
	private $settings = [];
	
	/**
	 * Constructor
	 * 
	 * @param ProviderSetting[] $settings
	 */
	public function __construct(array $settings)
	{
		foreach ($settings as $setting) {
			$this->add($setting);
		}
	}
	
	/**
	 * Add a setting to the collection
	 * 
	 * @param \Feed\ProviderSetting $setting
	 */
	public function add(ProviderSetting $setting)
	{
		$this->settings[$setting->name] = $setting;
	}
	
	/**
	 * @return ProviderSetting[]
	 */
	public function getAll() : array
	{
		return array_values($this->settings);
	}
	
	/**
	 * @return array
	 */
	public function jsonSerialize() : array
	{
		return $this->getAll();
	}
}
