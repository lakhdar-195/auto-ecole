<?php

namespace App\Services;

use Exception;

class Randq
{

    public $_tab = [];
    public function index($tab)
    {
        for($i = 0; $i < count($tab); $i++){

            $this->read($tab[$i]);
        }

        return $this->_tab;

    }


    public function read($arr)
    {

        $randArr = $this->rander(count($arr) - 1);

        for($i = 0; $i < count($randArr); $i++)
        {

            array_push($this->_tab, $arr[$randArr[$i]]);
        }
    }

    public function rander($max)
    {

        try {
            $min = 0;
            $count = 7; // Number of unique random numbers to generate
        
            $randomNumbers = $this->generateUniqueRandomNumbers($min, $max, $count);
        
            return $randomNumbers;
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function generateUniqueRandomNumbers($min, $max, $count) {
        if ($count > ($max - $min + 1)) {
            throw new Exception("Count cannot be greater than the range of numbers.");
        }
    
        // Create an array of all numbers in the range
        $numbers = range($min, $max);
    
        // Shuffle the array to randomize
        shuffle($numbers);
    
        // Return the required number of random values
        return array_slice($numbers, 0, $count);
    }
}