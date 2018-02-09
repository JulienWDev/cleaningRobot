<?php

require 'Grid.php';

use CleaningRobot\Grid;

$errors = array();

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
        $cssMapping = $grid->getCssMapping();

        $gridJson = '';
        if (true === is_array($gridArray)){
            try{
                $gridJson = json_encode($gridArray);
            } catch(\Exception $e){
                error_log('Exception: '.print_r($e->getMessage(), true), 0);
            }
        }

        $cssMappingJson = '';
        if (true === is_array($cssMapping)){
            try{
                error_log('$cssMapping = '.print_r($cssMapping,true),0);
                $cssMappingJson = json_encode($cssMapping, JSON_FORCE_OBJECT);
                $cssMappingJson = str_replace('"', '\'', $cssMappingJson);
                error_log('$cssMappingJson = '.$cssMappingJson,0);
            } catch(\Exception $e){
                error_log('Exception: '.print_r($e->getMessage(), true), 0);
            }
        }
    }
} else {
    $errors[] = 'Veuillez indiquer un fichier de grille.';
}

$htmlRobotCommandPanel = '
<table id="robot_command_panel" title="Veuillez placer le robot sur la grille">
    <tbody>
    <tr><th colspan="3">Command Panel</th></tr>
        <tr>
            <td></td><td><button id="btn_up" data-direction="up" disabled>UP</button></td><td></td>
        </tr>
        <tr>
            <td><button id="btn_left" data-direction="left" disabled>LEFT</button></td><td><button id="btn_explore" data-direction="explore" disabled>EXPLORE</button></td><td><button id="btn_right" data-direction="right" disabled>RIGHT</button></td>
            </tr>
        <tr>
            <td></td><td><button id="btn_bottom" data-direction="bottom" disabled>BOTTOM</button></td><td></td>
        </tr>
    </tbody>    
</table>';

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Général Hoover</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css" media="screen">
</head>
<body>

<?php
if (0 !== count($errors)):{
    foreach($errors as $error){
        echo '<p class="error">'.$error.'</p>';
    }
}

else:
?>

<table id="board" data-grid_json="<?php echo $gridJson; ?>" data-css_mapping_json="<?php echo $cssMappingJson; ?>">
    <tr>
        <td class="sub_table">
            <?php
            if ('' !== $htmlCoderViewGrid) {
                echo $htmlCoderViewGrid;
            } else {
                echo 'Impossible de charger la grille HTML.';
            }
            ?>
        </td>
        <td class="sub_table">
            <?php
            if ('' !== $htmlRobotViewGrid) {
                echo $htmlRobotViewGrid;
            } else {
                echo 'Impossible de charger la grille HTML.';
            }
            ?>
        </td>
        <td class="sub_table">
            <?php
            if ('' !== $htmlRobotCommandPanel) {
                echo $htmlRobotCommandPanel;
            } else {
                echo 'Impossible de charger les commandes du robot.';
            }
            ?>
        </td>
    </tr>
</table>
<div id="message"></div>
<?php
endif;
?>

<script
    src="http://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>

<script type="text/javascript" src="js/RobotCommandPanel.js"></script>
<script type="text/javascript" src="js/RobotView.js"></script>
<script type="text/javascript" src="js/MoveEngine.js"></script>
<script type="text/javascript" src="js/Sensors.js"></script>
<script type="text/javascript" src="js/Robot.js"></script>
<script type="text/javascript" src="js/Run.js"></script>


</body>
</html>