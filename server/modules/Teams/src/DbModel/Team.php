<?php
namespace Teams\DbModel;

use Database\Model\AbstractModel;

class Team extends AbstractModel
{
	const TAG_LEFT = "left";
	const TAG_RIGHT = "right";
	const TAG_HIDDEN = "hidden";
	
	public $id;
	public $slug;
	public $name;
	public $description;
	public $tag;
	public $tagPosition = self::TAG_HIDDEN;
	
	/**
	 * @var TeamTheme
	 */
	public $theme;
	
	/**
	 * @var TeamMember
	 */
	public $member;
	
	/**
	 * @var array
	 */
	public $settings = [];
	
	public function displayName(string $name) : string 
	{
		switch ($this->tagPosition) {
			case self::TAG_LEFT:
				return $this->tag ." ". $name;
			case self::TAG_RIGHT:
				return $name ." ". $this->tag;
			case self::TAG_HIDDEN:
			default:
				return $name;
		}
	}
}
