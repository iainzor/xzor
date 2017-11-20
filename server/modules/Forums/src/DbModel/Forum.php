<?php
namespace Forums\DbModel;

use Database\Model\AbstractModel;

class Forum extends AbstractModel 
{
	public $id;
	public $parentId;
	public $resource;
	public $resourceId;
	public $title;
	public $description;
}