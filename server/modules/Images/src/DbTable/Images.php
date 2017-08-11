<?php
namespace Images\DbTable;

use Database\Driver\MySQL\AbstractTable,
	Images\DbModel\Image;

class Images extends AbstractTable 
{
	public function getName(): string { return "images"; }
	
	public function getModelClass() : string { return Image::class; }
	
	public function getPrimaryKeys() : array { return ["id"]; }
	
	/**
	 * @return string
	 */
	public function generateSlug() : string
	{
		do {
			$slug = substr(md5(uniqid("IMAGE")), 0, 12);
			$image = $this->load($slug);
			
			if (!$image->id) {
				break;
			}
		} while (true);
		
		return $slug;
	}
	
	/**
	 * @param string $slug
	 * @return Image
	 */
	public function load(string $slug) : Image 
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`slug` = :slug
		");
		$statement->execute([
			":slug" => $slug
		]);
		$image = $statement->fetchObject(Image::class);
		
		if (!$image) {
			$image = new Image();
		}
		
		return $image;
	}
	
	/**
	 * @param Image $image
	 */
	public function save(Image $image)
	{
		if (!$image->id) {
			$image->id = $this->insert([
				"slug" => $image->slug,
				"data" => $image->data
			]);
		} else {
			$this->update([
				"slug" => $image->slug,
				"data" => $image->data
			], [
				"id" => $image->id
			]);
		}
	}
}
