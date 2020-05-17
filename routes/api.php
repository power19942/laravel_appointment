<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login','Api\\AuthController@login');
Route::post('register','Api\\AuthController@register');
// Route::get('experts','Api\\ExpertController@index');
Route::apiResource('experts','Api\\ExpertController');
Route::apiResource('appointment','Api\AppointmentController');
Route::post('update-time-slot','Api\\ExpertController@updateTimeSlot');
Route::post('apointment-avilable','Api\\AppointmentController@checkIfAvilable');
Route::post('change-time-zone','Api\\ExpertController@changeTimeZone');
