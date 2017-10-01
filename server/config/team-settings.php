<?php
return [
	"membership.type" => [
		"label"			=> "Membership Type",
		"description"	=> "Select the condition in which people can join your team",
		"fieldType"		=> "radio",
		"options"		=> [
			[
				"value"			=> "open",
				"label"			=> "Open",
				"description"	=> "Anyone can join your team"
			],
			[
				"value"			=> "closed",
				"label"			=> "Closed",
				"description"	=> "No one can join your team"
			],
			[
				"value"			=> "password",
				"label"			=> "Password Protected",
				"description"	=> "People must provide a password in order to join"
			]
		]
	],
	"membership.password" => [
		"label"			=> "Password",
		"description"	=> "Enter the password required to join your team",
		"fieldType"		=> "text",
		"conditions"	=> [
			"membership.type"	=> "password"
		],
		"isPublic"		=> false
	]
];
