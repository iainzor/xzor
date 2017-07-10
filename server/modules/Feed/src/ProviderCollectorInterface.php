<?php
namespace Feed;

interface ProviderCollectorInterface
{
	public function collect(string $resourceId = null) : array;
}