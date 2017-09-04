<?php
$CACHE_ROOT = dirname(dirname(__DIR__)) ."/private/cache";

return [
	Account\Module::class => [
		Account\Config::SESSION_NAME => "xzor_account_session",
		Account\Config::SESSION_LIFETIME => 2592000
	],
	Cache\Module::class => [
		Cache\Config::DEFAULT_LIFETIME => 300,
		Cache\Config::DRIVER_CLASS => Cache\Driver\FileSystem::class,
		Cache\Config::DRIVER_OPTIONS => [
			Cache\Driver\FileSystem::CONFIG_ROOTDIR => $CACHE_ROOT
		]
	],
	Games\Module::class => [
		Games\Config::ROLES => include __DIR__ ."/game-roles.php"
	],
	Reddit\Module::class => [
		Reddit\Config::AGENT_PLATFORM => "web",
		Reddit\Config::AGENT_APP_ID => "net.xzor",
		Reddit\Config::AGENT_VERSION => "1.0.0",
		Reddit\Config::AGENT_USERNAME => "iainzor"
	]
];