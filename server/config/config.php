<?php
return [
	Account\Module::class => [
		Account\Config::SESSION_NAME => "xzor_account_session",
		Account\Config::SESSION_LIFETIME => 2592000
	],
	Reddit\Module::class => [
		Reddit\Config::AGENT_PLATFORM => "web",
		Reddit\Config::AGENT_APP_ID => "net.xzor",
		Reddit\Config::AGENT_VERSION => "1.0.0",
		Reddit\Config::AGENT_USERNAME => "iainzor"
	]
];