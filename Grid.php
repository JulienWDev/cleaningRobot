<?php

namespace CleaningRobot;

class Grid{

        protected $filePath = '';
        protected $grid = array();
        protected $cssMapping = array(0 => 'empty', 1 => 'wall', 2 => 'obstacle');

        public function __construct($filePath)
        {
            $this->loadGrid($filePath);
        }

        private function loadGrid($filePath)
        {
//            echo "Raw Grid:<br /><br />";
            $handle = @fopen($filePath, "r");
            if ($handle) {
                while (($buffer = fgets($handle, 4096)) !== false) {
                    $gridLine = array();
                    $strlen = strlen( $buffer );

                    for( $i = 0; $i <= $strlen; $i++ ) {
                        $char = substr( $buffer, $i, 1 );
                        if(true === is_numeric($char)){
                            $gridLine[] = (int)$char;
                        }
                    }
//                    echo "$buffer<br />";

                    $this->grid[] = $gridLine;
                }
                if (!feof($handle)) {
                    echo "Erreur: fgets() a échoué\n";
                }
                fclose($handle);
//                echo "<br />";
            }
        }

        public function getGrid()
        {
            return $this->grid;
        }

        public function getHtmlGrid($mode)
        {
            $html = '';

            if (true !== in_array($mode, array('coderView', 'robotView'))){
                error_log('Error in '.__FUNCTION__.'(). Invalid mode given', 0);
                return $html;
            }

            if (true === is_array($this->grid) && 0 !== count($this->grid)){
                $tableClass = '';
                if ('coderView' === $mode){
                    $tableClass = 'interactive';
                }

                $html .= '<table id="'.$mode.'" class="'.$tableClass.' '.$mode.'"><tbody>';

                foreach($this->grid as $gridLine){
                    if (true === is_array($gridLine)){
                        $html .= '<tr>';
                        foreach($gridLine as $gridCell){
                            if (true === isset($this->cssMapping[$gridCell])){
                                $cssClass = $this->cssMapping[$gridCell];
                                if ('robotView' === $mode){
                                    $cssClass = 'unknown';
                                }
                                $html .= '<td class="'.$cssClass.'"></td>';
                            }
                        }
                        $html .= '</tr>';
                    }
                }
                $html .= '</tbody></table>';
            }

            return $html;
        }

}