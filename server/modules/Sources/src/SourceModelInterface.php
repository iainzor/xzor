<?php
namespace Sources;

interface SourceModelInterface extends \JsonSerializable
{
	public function setSource(SourceInterface $source);
	public function getSource() : SourceInterface;
}