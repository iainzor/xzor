<?php
namespace Images\Controller;

use Http\Request,
	Images\File,
	Images\Uploader;

class Images
{
	public function uploadAction(Request $request, Uploader $uploader)
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		if (!isset($_FILES["file"])) {
			throw new \Exception("No file has been sent with the request");
		}
		
		$file = File::fromRequest($_FILES["file"]);
		$image = $uploader->upload($file);
		
		return $image;
	}
}