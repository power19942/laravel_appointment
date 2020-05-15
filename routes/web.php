<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
//    $res =  geoip($r->ip);
//    return \Illuminate\Http\Request::ip();
//    dd(  new DateTime('2000-01-01', new DateTimeZone($res['timezone'])));
//    return $res['timezone'];
    return view('welcome');
});

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/{any}/{path?}',function (){
//    return \Carbon\Carbon::today('America/Panama');;
//    dd(timezone_identifiers_list());
    return redirect('/');
});
//Route::get('/{any}/{path?}','HomeController@index')->name('home');
