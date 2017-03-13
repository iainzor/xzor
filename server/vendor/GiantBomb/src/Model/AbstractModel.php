<?php
namespace GiantBomb\Model;

abstract class AbstractModel
{
	public function __construct(array $properties, array $map = [])
	{
		foreach ($properties as $name => $value) {
			if (isset($map[$name])) {
				$name = $map[$name];
			}
			
			if (property_exists($this, $name)) {
				$this->{$name} = $value;
			}
		}
	}
}
