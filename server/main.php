<?php
$start = microtime(true);
$debugMode = (bool) filter_input(INPUT_GET, "_DEBUG_MODE_");
$dir = __DIR__;
$i = 0;
while (!is_dir($dir . DIRECTORY_SEPARATOR . "Bliss")) {
	$dir = dirname($dir);
	$i++;
	
	if ($i > 5) {
		die("Could not locate Bliss");
	}
}

date_default_timezone_set("America/Los_Angeles");

$blissRoot = $dir . DIRECTORY_SEPARATOR . "Bliss";
$httpRoot = $blissRoot . DIRECTORY_SEPARATOR . "modules" . DIRECTORY_SEPARATOR . "Http";

require_once $httpRoot . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR . "Application.php";

$app = new Http\Application();
$modules = $app->moduleRegistry();
$modules->registerAll($blissRoot . DIRECTORY_SEPARATOR . "modules", [
	"Cache",
	"Common",
	"Core",
	"Database",
	"Http",
	"Logs",
	"Acl"
]);
$modules->registerAll(__DIR__ . DIRECTORY_SEPARATOR . "modules");
$modules->registerAll(__DIR__ . DIRECTORY_SEPARATOR . "vendor");
$app->config()->load([
	__DIR__ . DIRECTORY_SEPARATOR . "config/config.php",
	dirname(__DIR__) . DIRECTORY_SEPARATOR . "private" . DIRECTORY_SEPARATOR . "config.php"
]);

$uri = trim(
	filter_input(INPUT_SERVER, "PATH_INFO"),
	"/"
);

$exception = null;
try {
	$app->run($uri);
} catch (Throwable $e) {
	$exception = $e;
	if (!$debugMode) {
		throw $e;
	}
}

if ($debugMode) {
	$end = microtime(true);
	$totalTime = number_format($end - $start, 4);
	
	header("Content-Type: text/plain");
	
	if ($exception) {
		echo "==================\n";
		echo "EXCEPTION: ". $exception->getMessage() ."\n";
		echo "TRACE:\n";
		echo $exception->getTraceAsString() ."\n";
		echo "==================\n\n";
	}
	echo "Time:\t". $totalTime ."ms\n";
	echo "Memory Used:\t". (memory_get_peak_usage() / 1024) ."kb";
	exit;
}