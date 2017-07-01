<?php
namespace GiantBomb;

use Sources\AbstractSource,
	Sources\SourceLoaderInterface,
	UI\Theme;

class Source extends AbstractSource
{
	const SLUG = "giantbomb";
	const NAME = "GiantBomb";
	const WEBSITE = "https://giantbomb.com";
	
	/**
	 * @var GameSourceLoader
	 */
	private $loader;
	
	/**
	 * Constructor
	 * 
	 * @param \GiantBomb\Api $api
	 */
	public function __construct(Api $api) {
		$this->loader = new SourceLoader($this, $api);
	}
	
	public function slug() : string { return self::SLUG; }
	
	public function name() : string { return self::NAME; }
	
	public function website() : string { return self::WEBSITE; }
	
	public function theme() : Theme {
		return new Theme("#981616", "#ffffff");
	}
	
	public function loader() : SourceLoaderInterface {
		return $this->loader;
	}
}