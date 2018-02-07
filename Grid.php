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

                    $this->grid[] = $gridLine;
                }
                if (!feof($handle)) {
                    echo "Erreur: fgets() a échoué\n";
                }
                fclose($handle);
            }
        }

        public function getGrid()
        {
            return $this->grid;
        }

        public function getCssMapping()
        {
            return $this->cssMapping;
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

                $max_x = 0;
                $max_y = 0;
                foreach($this->grid as $y => $gridLine){
                    if (true === is_array($gridLine)){
                        $html .= '<tr>';
                        foreach($gridLine as $x => $gridCell){
                            if (true === isset($this->cssMapping[$gridCell])){
                                $cssClass = $this->cssMapping[$gridCell];
                                if ('robotView' === $mode){
                                    $cssClass = 'unknown';
                                }
                                $html .= '<td class="'.$cssClass.'" data-x="'.$x.'" data-y="'.$y.'"></td>';
                            }
                            if ($x > $max_x){
                                $max_x = $x;
                            }
                        }
                        $html .= '</tr>';
                    }
                    if ($y > $max_y){
                        $max_y = $y;
                    }
                }
                $html .= '</tbody></table><span id="'.$mode.'_boundaries" data-max_x="'.$max_x.'" data-max_y="'.$max_y.'"></span>';
            }

            return $html;
        }

}