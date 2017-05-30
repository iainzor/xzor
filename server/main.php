<?php
$start = microtime(true);
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

try {
	ob_start();
	
	$uri = trim(
		filter_input(INPUT_SERVER, "PATH_INFO"),
		"/"
	);
	$app->run($uri);
	$result = ob_get_clean();
	$end = microtime(true);
	$totalTime = $end - $start;
	
	if (isset($_GET["_stats_"])) {
		echo "Time:\t". $totalTime ."ms\n";
		echo "Memory Used:\t". (memory_get_peak_usage() / 1024) ."kb";
		exit;
	}
	
	echo $result;
} catch (Error $e) {
	header("Content-type: text/html");
	
	echo "<h1>Oops...</h1>";
	echo "<h4>". $e->getMessage() ."</h4>";
	echo "<pre>";
	echo $e->getTraceAsString();
	echo "</pre>";
	
	echo "<pre>";
	echo "Memory Used:\t". (memory_get_usage() / 1024) ."kb";
	echo "</pre>";
}