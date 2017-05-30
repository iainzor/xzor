<?php
namespace Account;

class Config
{
	const ROLE_GUEST = 100;
	const ROLE_USER = 200;
	const ROLE_ADMIN = 900;
	
	const SESSION_NAME = "account.session.name";
	const SESSION_LIFETIME = "account.session.lifetime";
}