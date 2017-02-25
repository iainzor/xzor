<?php
$dir = __DIR__;
$i = 0;
while (!is_dir($dir . DIRECTORY_SEPARATOR . "Bliss")) {
	$dir = dirname($dir);
	$i++;
	
	if ($i > 5) {
		die("Could not locate Bliss");
	}
}

$blissRoot = $dir . DIRECTORY_SEPARATOR . "Bliss";
$httpRoot = $blissRoot . DIRECTORY_SEPARATOR . "modules" . DIRECTORY_SEPARATOR . "Http";

require_once $httpRoot . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR . "Application.php";

$app = new Http\Application();
$modules = $app->moduleRegistry();
$modules->registerAll($blissRoot . DIRECTORY_SEPARATOR . "modules", [
	"Common",
	"Core",
	"Http",
	"Logs"
]);
$modules->registerAll(__DIR__ . DIRECTORY_SEPARATOR . "modules");
$app->run();