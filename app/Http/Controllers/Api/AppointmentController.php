<?php

namespace App\Http\Controllers\Api;

use App\Appointment;
use App\Http\Controllers\Controller;
use App\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $timezone = geoip(getClientIp())['timezone'];
        $app = Appointment::with('appointmentExpert')
            ->where('client_id', request()->user()->id)
            ->get()
            ->map(function ($a) use ($timezone){
                $start = convertDateToAnotherTimeZone($a->appointmentExpert->expert_start_time,$timezone)
                    ->format('Y-m-d H:i:s');
                $end = convertDateToAnotherTimeZone($a->appointmentExpert->expert_end_time,$timezone)
                    ->format('Y-m-d H:i:s');
                $a->appointmentExpert = $a->appointmentExpert->name;
                $time_slot_index = $a->time_slot;
                $time_slot = getTimeSlot($start, $end, $a->duration);
                $a->time_slot = $time_slot[$time_slot_index]. ' - '.$time_slot[$time_slot_index+1];
                return $a;
            });
        return $app;
    }

    public function checkIfAvilable(Request $request)
    {
        $start = $request->begin . ' ' . $request->start;
        $end = $request->begin . ' ' . $request->end;
        $time_slots = getTimeSlot($start, $end, $request->duration);
        $time_slot_index = $request->time_slot_index;
        $time_slot = $time_slots[$time_slot_index] .' - '.$time_slots[$time_slot_index+1];



        $timeSlotSplit = explode('-', $time_slot);
        $start = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[0], 'UTC')
            ->format('Y-m-d H:i:s');
        $end = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[1], 'UTC')
            ->format('Y-m-d H:i:s');

        return DB::table('appointments')
            ->where('expert_id',$request->id)
            ->whereBetween('begin',[$start,$end])
            ->whereBetween('end',[$start,$end])
            ->count();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $start = $request->begin . ' ' . $request->start;
            $end = $request->begin . ' ' . $request->end;
            $time_slots = getTimeSlot($start, $end, $request->duration);

            $time_slot_index = $request->time_slot_index;
            $time_slot = $time_slots[$time_slot_index] .' - '.$time_slots[$time_slot_index+1];
            $appointment = Appointment::create([
                'client_id' => $request->client_id,
                'expert_id' => $request->expert_id,
                'time_slot' => $time_slot_index,
                'begin' =>  $request->begin . ' ' . $time_slots[$time_slot_index],
                'end' => $request->begin . ' ' . $time_slots[$time_slot_index+1],
                'duration' => $request->duration
            ]);
            return $time_slot;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Appointment $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Appointment $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Appointment $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
