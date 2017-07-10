<?php
namespace Feed;

class Feed
{
	public function collector(FeedDefinitionInterface $feedDef) : Collector
	{
		return new Collector($this, $feedDef);
	}
}