<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <?php

// echo "<p>Data Processed at </p>";

// // Define the time zone based on the coordinated universal time
// date_default_timezone_set('UTC');

/* Echos the date
h : 12 hr format
H : 24 hr format
i : Minutes
s : Seconds
u : Microseconds
a : Lowercase am or pm
l : Full text for the day
F : Full text for the month
j : Day of the month
S : Suffix for the day st, nd, rd, etc.
Y : 4 digit year
*/
// echo date('h:i:s:u a, l F jS Y e');
// echo "</p>";

$usersName = $_POST['username'];
$streetAdress = $_POST['streetaddress'];
$cityAddress = $_POST['cityaddress'];

echo $usersName . "</br>" ;
echo $streetAdress . "</br>";
echo $cityAddress . "</br>";
$str = <<<EOD
The customers name is  $usersName
and they live at $streetAdress
in $cityAddress </br>
EOD;
echo  $str;
//constant
define('PI', M_1_PI);
echo "The value of PI is: " .PI ."</br>";

// echo "</br>5 + 2 = " . (5+2);
// echo "</br>5 - 2 = " . (5-2);
// echo "</br>5 * 2 = " . (5*2);
// echo "</br>5 % 2 = " . (5%2);
// echo "</br>5 / 2 = " . (integer)(5/2);

$randomNum = 5;

// $refToNum = &$randomNum;
// $randomNum = 100;
// echo '$refToNum = ' . $refToNum;

// if( 5 == 10){

//     echo '5 = 10';
// } else {

//     echo '5 != 10';
// }

$numofOrangers = 4 ;
$numOfbananas = 36 ;

if( ( $numofOrangers > 25) && ( $numOfbananas > 30)){
    
    echo "Yo have discount 20%";
} elseif ( ( $numofOrangers > 10) || ( $numOfbananas > 30)){
    echo "Yo have discount 15% </br>";
    
} elseif ( !(($numofOrangers <5)) || (!($numOfbananas < 5))){
    
    echo "5% Discount";
} else {
    
    echo "No discount for you! ";
    }

// condition ? true : false
$biggestNumber = (15 > 10) ? 15 : 10;
echo "$biggestNumber . </br>" ;

switch ($usersName) {
    case 'Dzmitry':
        echo "Hello Dzmitry </br>";
        break;
    
    default:
        echo "Hello valued custimer </br>";
        break;
}
$beginNum = 0;

// while ($beginNum < 20) {
    
//         echo ++$beginNum . ', ';
  
    
    
// }
// for ($beginNum=0; $beginNum <= 20 ; $beginNum++) {

//                 echo $beginNum;
//                 if($beginNum != 20){
//                     echo ", ";
//                 } else {
//                     //break
//                      echo ". ";
//                 }
        
// }
//  $array = array( 'Peter' , 'Nahir' , 'People' );

                // echo $array[0];
                //     $array[3] = "Friend";
            // foreach($array as $friend){

            //     echo $friend;
            // }
// $customer = array('Name'=>$usersName, 'Street'=>$streetAdress, 'City'=>$cityAddress);

//     foreach($customer as $key => $value){

//         echo $key . ' : ' . $value . '</br>';
        
//     }

 $array = array(array('Dzmitry', '1234 main', '23451'),
                    array('Yuliana', '1234 main', '233451'),
                    array('Grisha', '1234 main', '23456'));
            for($row =0; $row < 3; $row++){

                for($col = 0; $col < 3; $col ++){

                    echo $array[$row][$col] . ', ';
                }
                echo '<br>';
            }

            $randString = "     Random String      ";
         $randString = trim("$randString");
         echo "The randString is $randString </br>"; 

         printf  (" The randomString is %s </br>" , $randString) ;

            //working with decimals
         $decimal = 2.34567;
         printf("decimal num = %.2f </br>" ,$decimal );


            // str = > arr
        //  $arrayForString = explode(' ', $randString,2);
        //     //arr =str
        //  $stringToArray = implode(' ', $arrayForString);
        //     // substring takes all leterrs from 0 => to 6 
        // $partOfString = substr("Random String", 0, 6)

        $man  = "Man";
        $manhole = "Manhole";
        //string compare 
        echo strcmp($man, $manhole) . '</br>';
            // srecasecmp
            //strstr   
    $newString = str_replace("String", "Stuff", $randString) . '</br>';
    echo $newString;

        function addNumbers($num1, $num2){

            return $num1 + $num2;

        }
            echo "3 + 4 = " . addNumbers(3,4);
?>
