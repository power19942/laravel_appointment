<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use JamesMills\LaravelTimezone\Facades\Timezone;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','expert_end_time','expert_start_time','country','timezone',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function scopeExpert($query)
    {
        return $query->where('isExpert', 1);
    }

    public function userAppointments(){
        return $this->hasMany(Appointment::class,'client_id');
    }
    public function expertAppointments(){
        return $this->hasMany(Appointment::class,'expert_id');
    }

}
