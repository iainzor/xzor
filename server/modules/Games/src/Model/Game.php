<?php
namespace Games\Model;

use Database\Model\AbstractModel,
	Sources\SourceModelInterface,
	UI\ThemeInterface,
	UI\Theme;

class Game extends AbstractModel implements SourceModelInterface
{
	public $id;
	public $source;
	public $sourceId;
	public $title;
	public $slug;
	public $description;
	public $coverImage;
	
	/**
	 * @var GameTheme
	 */
	public $theme;
	
	/**
	 * @var GameImage[]
	 */
	public $images = [];
	
	public function __construct(array $properties = array(), array $map = array()) {
		parent::__construct($properties, $map);
		
		if (isset($this->theme) && is_array($this->theme)) {
			$this->theme = new GameTheme($this->theme);
		}
	}
	
	public function getSourceTheme() : ThemeInterface {
		if (!isset($this->theme)) {
			return new Theme("#ffffff", "#ffffff", "#212121");
		}
		return $this->theme;
	}

	public function setSourceTheme(ThemeInterface $theme) {
		$this->theme = $theme;
	}
}