<?php

// this function will return the real ip of the client
// laravel request()->ip() return the load balancer ip
function getClientIp(){
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
        if (array_key_exists($key, $_SERVER) === true){
            foreach (explode(',', $_SERVER[$key]) as $ip){
                $ip = trim($ip); // just to be safe
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                    return $ip;
                }else{
                    return \request()->ip();
                }
            }
        }
    }
}

function requesterTimezone($ip)
{
    return geoip($ip)['timezone'];
}

function convertTimeStampToTime($timestamp)
{
    return date('h:i a', $timestamp);
}


function convertDateToAnotherTimeZone($date, $tz)
{
    return (new DateTime($date))->setTimezone(new DateTimeZone($tz));
}


function getTimeFromTimeZone($date, $tz = '')
{
    if ($tz == '')
        return (new DateTime($date))->format('h:i a');
    else
        return (new DateTime($date))->setTimezone(new DateTimeZone($tz))->format('h:i a');
}

function getTimeOnly($date)
{
    return $date->format('h:i a');
}

function getTimeSlot($StartTime, $EndTime, $Duration = "60")
{
    $ReturnArray = array();
    $StartTime = strtotime($StartTime);
    $EndTime = strtotime($EndTime);

    $AddMins = $Duration * 60;

    while ($StartTime <= $EndTime) {
        $ReturnArray[] = date("h:i a", $StartTime);
        $StartTime += $AddMins;
    }
    return $ReturnArray;
}
