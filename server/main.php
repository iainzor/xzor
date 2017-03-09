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
	"Database",
	"Http",
	"Logs"
]);
$modules->registerAll(__DIR__ . DIRECTORY_SEPARATOR . "modules");
$app->config()->load([
	__DIR__ . DIRECTORY_SEPARATOR . "config.php",
	dirname(__DIR__) . DIRECTORY_SEPARATOR . "private" . DIRECTORY_SEPARATOR . "config.php"
]);

try {
	$app->run();
} catch (\Exception $e) {
	echo "<h1>Oops...</h1>";
	echo "<h4>". $e->getMessage() ."</h4>";
	echo "<pre>";
	echo $e->getTraceAsString();
	echo "</pre>";
	
	echo "<pre>";
	echo "Memory Used:\t". (memory_get_usage() / 1024) ."kb";
	echo "</pre>";
}