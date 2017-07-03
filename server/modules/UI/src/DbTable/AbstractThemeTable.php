<?php
namespace UI\DbTable;

use Database\Driver\MySQL\AbstractTable,
	UI\ThemeInterface,
	UI\Theme;

abstract class AbstractThemeTable extends AbstractTable
{
	abstract public function getDefaultBackground() : string;
	abstract public function getDefaultText() : string;
	abstract public function getIdColumnName() : string;
	
	/**
	 * Attempt to load a theme using a unique ID
	 * 
	 * @param mixed $id
	 * @return ThemeInterface
	 */
	public function load($id) : ThemeInterface
	{
		$statement = $this->db->prepare("
			SELECT	*
			FROM	`". $this->getName() ."`
			WHERE	`". $this->getIdColumnName() ."` = :id
		");
		$statement->execute([
			":id" => $id
		]);
		
		$theme = $statement->fetchObject(Theme::class);
		if (!$theme) {
			$theme = new Theme(
				$this->getDefaultBackground(),
				$this->getDefaultText()
			);
		}
		return $theme;
	}
	
	/**
	 * Save changes to an existing theme
	 * 
	 * @param mixed $id
	 * @param array $data
	 */
	public function save($id, array $data)
	{
		$this->insert([
			$this->getIdColumnName() => $id,
			"background" => isset($data["background"]) ? $data["background"] : $this->getDefaultBackground(),
			"text" => isset($data["text"]) ? $data["text"] : $this->getDefaultText()
		], [
			"background",
			"text"
		]);
	}
}
