<?php
namespace Account\Permission;

interface PermissionProviderInterface
{
	public function provideAccountPermissions(PermissionRegistry $registry);
}
