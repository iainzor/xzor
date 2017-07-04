<?php
namespace Sources;

abstract class AbstractSource implements SourceInterface
{
	public function jsonSerialize() 
	{
		return [
			"slug" => $this->slug(),
			"name" => $this->name(),
			"website" => $this->website(),
			"theme" => $this->theme()
		];
	}
}