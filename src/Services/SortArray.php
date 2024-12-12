<?php

namespace App\Services;


class SortArray 
{

    public $_array;
    public $_arr = [];
    public $_project = [];

    public function __construct(Array $array)
    {
        
        $this->_array = $array;
    }

    public function pushArray (): Array
    {
        
        $i = 0;
        $response = [];
        $state = [];
        for($i = 0; $i < count($this->_array); $i++)
        {

            $_array = [];

            if($i < count($this->_array ) - 1 and $this->_array[$i]['id'] == $this->_array[$i + 1]['id']){

                array_push($response, $this->_array[$i]['response']);
                array_push($state, $this->_array[$i]['isValid']);

            }elseif( $i < count($this->_array ) - 1 and $this->_array[$i]['id'] != $this->_array[$i + 1]['id']){

                $_array += ['id' => $this->_array[$i]['id']];
                $_array += ['img' => $this->_array[$i]['img']];
                $_array += ['type' => $this->_array[$i]['type']];
                $_array += ['question' => $this->_array[$i]['question']];
                array_push($response, $this->_array[$i]['response']);
                $_array += ['response' => $response];

                array_push($state, $this->_array[$i]['isValid']);
                $_array += ['state' => $state];
                
                
            }elseif( $i == count($this->_array ) -1 ){

                $_array += ['id' => $this->_array[$i]['id']];
                $_array += ['img' => $this->_array[$i]['img']];
                $_array += ['type' => $this->_array[$i]['type']];
                $_array += ['question' => $this->_array[$i]['question']];
                array_push($response, $this->_array[$i]['response']);
                $_array += ['response' => $response];

                array_push($state, $this->_array[$i]['isValid']);
                $_array += ['state' => $state];

            }

            if($i < count($this->_array ) - 1 and $this->_array[$i]['id'] != $this->_array[$i + 1]['id']){

                $response = [];
                $state= [];
            }
            if($i == count($this->_array ) - 1 ){

                $response = [];
                $state= [];
            }

            if($_array != null){
                array_push($this->_project, $_array); 
            }
        }
    

        return $this->_project;
    }


}