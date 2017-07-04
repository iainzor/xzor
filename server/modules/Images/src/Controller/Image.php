<?php
namespace Images\Controller;

use Http\Route,
	Images\DbTable;

class Image
{
	public function displayAction(Route $route, DbTable\Images $images)
	{
		$slug = $route->param("slug");
		$image = $images->load($slug);
		
		if (!$image->id) {
			throw new \Exception("Image could not be found");
		}
		
		$expires = mktime(date("H"), date("i"), date("s"), date("m"), date("j"), date("Y") + 1);
		$maxAge = $expires - time();
		
		header("Content-Type: image/png");
		header("Cache-Control: max-age={$maxAge}, public");
		header("Expires: ". date("r", $expires));
		header("Pragma: cache");
		
		$image->output();
		
		exit;
	}
}