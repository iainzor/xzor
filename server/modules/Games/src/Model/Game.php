<?php
namespace Games\Model;

use Database\Model\AbstractModel,
	Sources\SourceModelInterface,
	UI\Theme;

class Game extends AbstractModel implements SourceModelInterface
{
	public $id;
	public $source;
	public $sourceId;
	public $title;
	public $slug;
	public $description;
	public $theme;
	public $coverImage;
	public $images = [];
	
	public function getSourceTheme() : Theme {
		if (!isset($this->theme)) {
			return new Theme("#ffffff", "#ffffff", "#212121");
		}
		return $this->theme;
	}

	public function setSourceTheme(Theme $theme) {
		$this->theme = $theme;
	}
}