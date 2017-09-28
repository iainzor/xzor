<?php
namespace Teams\Controller;

use Http\Request,
	Teams\Forms\TeamForm,
	Teams\TeamLoader,
	Teams\TeamSearchParams;

class TeamsController
{
	public function listAction(TeamLoader $loader, Request $request)
	{
		$params = new TeamSearchParams(
			$request->inputGetAll()
		);
		
		return $loader->loadAll($params);
	}
	
	public function myTeamsAction(TeamLoader $loader, Request $request)
	{
		$params = new TeamSearchParams(
			$request->inputGetAll()
		);
		$params->myTeams = true;
		
		return $loader->loadAll($params);
	}
	
	public function newAction(Request $request, TeamForm $form)
	{
		if (!$request->methodIsPost()) {
			throw new \Exception("Only POST requests are allowed");
		}
		
		return $form->execute(
			$request->json()->data()
		);
	}
}
