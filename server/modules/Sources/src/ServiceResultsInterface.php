<?php
namespace Sources;

interface ServiceResultsInterface
{
	public function slug() : string;
	public function name() : string;
	public function results() : array;
}