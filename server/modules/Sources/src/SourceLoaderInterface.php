<?php
namespace Sources;

interface SourceLoaderInterface
{
	public function find(string $q) : SourceSearchResponse;
}