<?php
namespace GiantBomb\Resource;

class Image extends AbstractResource 
{
	public function load(string $imageUrl)
	{
		return $this->api->getRaw($imageUrl);
	}
}
