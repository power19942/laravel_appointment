<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $guarded = [];

    public function appointmentUser(){
        return $this->hasOne(User::class,'id','client_id');
    }
    public function appointmentExpert(){
        return $this->hasOne(User::class,'id','expert_id');
    }


    public function getBeginAttribute($value){
        $timezone = geoip(request()->ip())['timezone'];
        return convertDateToAnotherTimeZone($value,$timezone)
        ->format('d/m/yy');
    }

    public function setBeginAttribute($value){
        //save date as utc
        $this->attributes['begin'] = convertDateToAnotherTimeZone($value,'UTC')
            ->format('Y-m-d H:i:s');
    }

    public function setEndAttribute($value){
        //save date as utc
        $this->attributes['end'] = convertDateToAnotherTimeZone($value,'UTC')
            ->format('Y-m-d H:i:s');
    }
}
