<?php
namespace Games;

class GameImageSaver
{
	/**
	 * @var DbTable\GameImages
	 */
	private $images;
	
	/**
	 * Constructor
	 * 
	 * @param \Games\DbTable\GameImages $images
	 */
	public function __construct(DbTable\GameImages $images)
	{
		$this->images = $images;
	}
	
	/**
	 * Save an image to the database
	 * 
	 * @param \Games\Model\GameImage $image
	 */
	public function save(Model\GameImage $image) : Model\GameImage
	{
		if (!$image->gameId()) {
			throw new \Exception("No game ID was provided for the image");
		}
		
		if (!$image->id()) {
			$id = $this->images->insert([
				"gameId" => $image->gameId(),
				"category" => $image->category,
				"url" => $image->url
			]);
			$image->id((int) $id);
		} else {
			$this->images->update([
				"category" => $image->category
			]);
		}
		
		return $image;
	}
}