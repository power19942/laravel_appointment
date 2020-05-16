<?php

//function convertStringToTimeStamp($time)
//{
//    return date("G:i", strtotime($time));
//
//}
function convertTimeStampToTime($timestamp)
{
    return date('h:i a', $timestamp);
}


function convertDateToAnotherTimeZone($date, $tz)
{
    return (new DateTime($date))->setTimezone(new DateTimeZone($tz));
}


function getTimeFromTimeZone($date,$tz)
{
    return (new DateTime($date))->setTimezone(new DateTimeZone($tz))->format('h:i a');
}
function getTimeOnly($date)
{
    return $date->format('h:i a');
}

function getTimeSlot($StartTime, $EndTime, $Duration="60"){
    $ReturnArray = array ();
    $StartTime    = strtotime ($StartTime);
    $EndTime      = strtotime ($EndTime);

    $AddMins  = $Duration * 60;

    while ($StartTime <= $EndTime)
    {
        $ReturnArray[] = date ("G:i", $StartTime);
        $StartTime += $AddMins;
    }
    return $ReturnArray;
}
