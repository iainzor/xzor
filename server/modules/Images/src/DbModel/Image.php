<?php
namespace Images\DbModel;

use Database\Model\AbstractModel;

class Image extends AbstractModel
{
	public $id;
	public $slug;
	public $data;
	
	public function url() : string
	{
		return "img/". $this->slug .".png";
	}
	
	public function output()
	{
		$image = imagecreatefromstring($this->data);
		imagejpeg($image);
	}
	
	public function jsonSerialize() : array
	{
		return [
			"slug" => $this->slug,
			"url" => $this->url()
		];
	}
}
