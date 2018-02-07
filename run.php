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

$htmlRobotCommands = '
<table id="robot_commands">
    <tbody>
        <tr>
            <td></td><td><button id="btn_up">UP</button></td><td></td>
        </tr>
        <tr>
            <td><button id="btn_up">LEFT</button></td><td></td><td><button id="btn_up">RIGHT</button></td>
            </tr>
        <tr>
            <td></td><td><button id="btn_bottom">BOTTOM</button></td><td></td>
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
            if ('' !== $htmlRobotCommands) {
                echo $htmlRobotCommands;
            } else {
                echo 'Impossible de charger les commandes du robot.';
            }
            ?>
        </td>
    </tr>
</table>
<span id="message"></span>
<?php
endif;
?>

<script
    src="http://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
<script type="text/javascript" src="js/RobotView.js"></script>
<script type="text/javascript" src="js/MoveEngine.js"></script>
<script type="text/javascript" src="js/Sensors.js"></script>
<script type="text/javascript" src="js/Robot.js"></script>
<script type="text/javascript" src="js/Run.js"></script>

</body>
</html>