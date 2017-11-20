<?php
namespace Forums\Controller;

use Database\Query\QueryParams,
	Forums\DbTable,
	Http\Route;

class ForumsController
{
	public function listAction(Route $route, DbTable\Forums $forums)
	{
		return $forums->fetchAll(new QueryParams([
			"resource" => $route->param("resource"),
			"resourceId" => $route->param("resourceId")
		], ["`title`"]));
	}
}