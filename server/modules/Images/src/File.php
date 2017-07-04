<?php
namespace Images;

class File
{
	public $name;
	public $type;
	public $tempName;
	public $error = 0;
	public $size;
	
	/**
	 * Generate a new file instance from a request
	 * 
	 * @param array $data
	 */
	public static function fromRequest(array $data) : File
	{
		$file = new self();
		$file->name = $data["name"];
		$file->type = $data["type"];
		$file->tempName = $data["tmp_name"];
		$file->error = (int) $data["error"];
		$file->size = (int) $data["size"];
		
		return $file;
	}
}