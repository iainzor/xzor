<?php
namespace Games\Feed;

use Feed\AbstractFeedDefinition;

class GameFeedDefinition extends AbstractFeedDefinition
{
	public function getName() : string { return "game-feed"; }
}