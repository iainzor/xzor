<?php
namespace Sources;

trait SourceTrait
{
	public function toArray(SourceInterface $source) : array {
		return [
			"slug" => $source->slug(),
			"name" => $source->name(),
			"website" => $source->website(),
			"theme" => $source->theme()
		];
	}
}