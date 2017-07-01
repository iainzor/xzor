<?php
namespace Images;

class Uploader
{
	/**
	 * @var \Images\DbTable\Images
	 */
	private $images;
	
	/**
	 * Constructor
	 * 
	 * @param \Images\DbTable\Images $images
	 */
	public function __construct(DbTable\Images $images) 
	{
		$this->images = $images;
	}
	
	/**
	 * @param \Images\File $file
	 * @return \Images\DbModel\Image
	 * @throws \Exception
	 */
	public function upload(File $file) : DbModel\Image
	{
		if ($file->error !== 0) {
			throw new \Exception("An error occurred while uploading the file");
		}
		
		if (!file_exists($file->tempName)) {
			throw new \Exception("Could not find uploaded file");
		}
		
		$slug = $this->images->generateSlug();
		$image = new DbModel\Image([
			"slug" => $slug,
			"data" => file_get_contents($file->tempName)
		]);
		$this->images->save($image);
		
		return $image;
	}
}