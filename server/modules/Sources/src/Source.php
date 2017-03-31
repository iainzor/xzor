<?php
namespace Sources;

use Common\StringOperations,
	UI\Theme;

class Source implements SourceInterface, \JsonSerializable
{
	/**
	 * @var string
	 */
	private $name;
	
	/**
	 * @var string
	 */
	private $slug;
	
	/**
	 * @var string
	 */
	private $website;
	
	/**
	 * @var Theme
	 */
	private $theme;
	
	/**
	 * Constructor
	 * 
	 * @param string $name
	 * @param string $website
	 * @param SourceServiceInterface
	 * @param Theme $theme
	 */
	public function __construct(string $name, string $website, SourceServiceInterface $service, Theme $theme)
	{
		$stringOps = new StringOperations();
		
		$this->name = $name;
		$this->slug = $stringOps->hyphenate($name);
		$this->website = $website;
		$this->theme = $theme;
	}
	
	public function name(): string { return $this->name; }

	public function slug(): string { return $this->slug; }
	
	public function website(): string { return $this->website; }

	public function theme(): Theme { return $this->theme; }
	
	public function jsonSerialize() 
	{
		return [
			"name" => $this->name,
			"slug" => $this->slug,
			"website" => $this->website,
			"theme" => $this->theme
		];
	}
}
