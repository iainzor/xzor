<?php
namespace Sources;

interface ServiceInterface
{
	public function load($id) : SourceModelInterface;
}