<?php
namespace Teams\Controller;

use Account\Permission\AccountPermissions,
	Core\DI,
	Http\Request,
	Http\Route,
	Teams\TeamLoader,
	Teams\TeamMemberLoader,
	Teams\Forms\TeamForm,
	Teams\Settings;

class TeamController
{
	/**
	 * @var \Teams\DbModel\Team
	 */
	private $team;
	
	/**
	 * Constructor
	 * 
	 * @param TeamLoader $loader
	 * @param Route $route
	 */
	public function __construct(DI $di, TeamLoader $loader, Route $route)
	{
		$this->team = $loader->loadBySlug(
			$route->param("slug")
		);
		
		$di->register($this->team);
	}
	
	public function indexAction(TeamForm $form, Request $request)
	{
		if ($request->methodIsPost()) {
			$form->setTeam($this->team);
			
			return $form->execute(
				$request->json()->data()
			);
		}
		
		return $this->team;
	}
	
	public function membersAction(TeamMemberLoader $loader)
	{
		return $loader->loadAll();
	}
	
	public function settingsAction(Settings\Registry $registry, AccountPermissions $permissions)
	{
		$settings = $registry->loadForTeam($this->team);
		$settings->showPrivateSettings(
			$permissions->isAllowed("manage", "team", $this->team->slug)
		);
		
		return $settings;
	}
}