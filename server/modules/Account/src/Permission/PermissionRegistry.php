<?php
namespace Account\Permission;

use Account\Account,
	Core\DI,
	Http\Request;

class PermissionRegistry
{
	/**
	 * @var DI
	 */
	private $di;
	
	/**
	 * @var ResourceProviderInterface[]
	 */
	private $instances = [];
	
	/**
	 * Constructor
	 * 
	 * @param DI $di
	 */
	public function __construct(DI $di)
	{
		$this->di = $di;
	}
	
	/**
	 * Register a resource permission provider
	 * 
	 * @param string $className
	 * @throws \UnexpectedValueException
	 */
	public function registerResourceProvider(string $className)
	{
		$instance = $this->di->create($className);
		
		if (!($instance instanceof ResourceProviderInterface)) {
			throw new \UnexpectedValueException("\$className must be an instance of ". ResourceProviderInterface::class);
		}
		
		$this->instances[] = $instance;
	}
	
	/**
	 * Get all permissions for an account
	 * 
	 * @param Account $account
	 * @param string $resource
	 * @param string $resourceId
	 * @return \Account\Permission\ResourceCollection
	 */
	public function getAll(Account $account, string $resource = null, string $resourceId = null) : ResourceCollection
	{
		$collection = new ResourceCollection();
		
		foreach ($this->instances as $instance) {
			if ($instance->requiresResourceId() && $resourceId === null) {
				continue;
			}
			
			if ($resource === null || $instance->getResource() === $resource) {
				$permissions = new PermissionCollection($instance->getResource());
				$instance->providePermissions($permissions, $account, $resourceId);
				$collection->add($permissions);
			}
		}
		
		return $collection;
	}
}
