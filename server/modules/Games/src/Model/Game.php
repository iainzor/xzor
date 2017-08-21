<?php
namespace Games\Model;

use Database\Model\AbstractModel;

class Game extends AbstractModel
{
	public $id;
	public $sourceName = null;
	public $sourceId = null;
	public $title;
	public $slug;
	public $description;
	public $coverImage;
	public $following = false;
	
	/**
	 * @var GameTheme
	 */
	public $theme;
	
	/**
	 * @param array $properties
	 * @param array $map
	 */
	public function __construct(array $properties = array(), array $map = array()) {
		parent::__construct($properties, $map);
		
		if (isset($this->theme) && is_array($this->theme)) {
			$this->theme = new GameTheme($this->theme);
		}
	}
}