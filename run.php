<?php

require 'Grid.php';

use CleaningRobot\Grid;

$gridsFolder = 'grids';

$htmlGrid = '';
if (true === isset($_GET['filename']) && '' != $_GET['filename']){
    $fileName = $_GET['filename'];
    $filePath = $gridsFolder . DIRECTORY_SEPARATOR . $fileName;
    if (true === file_exists($filePath)){
        $grid = new Grid($filePath);
        $htmlCoderViewGrid = $grid->getHtmlGrid('coderView');
        $htmlRobotViewGrid = $grid->getHtmlGrid('robotView');
        $gridArray = $grid->getGrid();
        if (true === is_array($gridArray)){
            $gridJson = '';
            try{
                $gridJson = json_encode($gridArray);
            } catch(\Exception $e){
                error_log('Exception: '.print_r($e->getMessage(), true), 0);
            }
        }
    }
}



?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Général Hoover</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css" media="screen">
</head>
<body>
<table id="board" data-grid_array="<?php echo $gridJson; ?>">
    <tr>
        <td>
            <?php
            if ('' !== $htmlCoderViewGrid) {
                echo $htmlCoderViewGrid;
            } else {
                echo 'Impossible de charger la grille HTML.';
            }
            ?>
        </td>
        <td>
            <?php
            if ('' !== $htmlRobotViewGrid) {
                echo $htmlRobotViewGrid;
            } else {
                echo 'Impossible de charger la grille HTML.';
            }
            ?>
        </td>
    </tr>
</table>

<span id="message"></span>
<script
    src="http://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
<script type="text/javascript" src="js/Sensor.js"></script>
<script type="text/javascript" src="js/Robot.js"></script>
<script type="text/javascript" src="js/Run.js"></script>

</body>
</html>