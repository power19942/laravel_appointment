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
        // return convertTimeStampToTime($value);
        return convertDateToAnotherTimeZone($value,$this->appointmentUser->timezone)
        ->format('d/m/yy h:i a');
    }
}
