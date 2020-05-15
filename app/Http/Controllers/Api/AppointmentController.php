<?php

namespace App\Http\Controllers\Api;

use App\Appointment;
use App\Http\Controllers\Controller;
use App\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return request()->user()->userAppointments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $expert = User::find($request->expert_id);
        $userTime= convertDateToAnotherTimeZone(User::find($request->expert_id)->expert_start_time,$expert->timezone);
        // $userTime= convertDateToAnotherTimeZone(User::find($request->expert_id)->expert_start_time,$request->user()->timezone);
        error_log($userTime->format('h:i a'));
        // error_log((new DateTime(User::find($request->expert_id)->expert_start_time))->format('h:i'));
        // error_log((new DateTime($request->begin))->format('h:i'));
        return;
        $appointment = Appointment::create([
            'client_id' => $request->client_id,
            'expert_id' => $request->expert_id,
            'begin' => $request->begin,
            'end' => ' $request->begin',
            'duration' => '$request->duration'
        ]);
        return $appointment;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
