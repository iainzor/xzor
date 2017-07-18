<?php
namespace Games\Model;

use Database\Model\AbstractModel,
	Sources\SourceModelInterface,
	Sources\SourceInterface;

class Game extends AbstractModel implements SourceModelInterface
{
	public $id;
	public $sourceName = null;
	public $sourceId = null;
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
	
	/**
	 * @var SourceInterface
	 */
	public $source;
	
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
	
	public function getPrimaryKeys() : array { return ["id"]; }
	
	/**
	 * @return SourceInterface
	 */
	public function getSource() : SourceInterface {
		return $this->source;
	}

	/**
	 * @param SourceInterface $source
	 */
	public function setSource(SourceInterface $source) {
		$this->source = $source;
		
		if (!isset($this->theme)) {
			$this->theme = $source->theme();
		}
	}
}