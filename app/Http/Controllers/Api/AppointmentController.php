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
        $app = Appointment::with('appointmentExpert')->where('client_id', request()->user()->id)
            ->get()
            ->map(function ($a) {
                $a->appointmentExpert = $a->appointmentExpert->name;
                return $a;
            });
        return $app;
    }

    public function checkIfAvilable(Request $request)
    {
        $timezone = geoip($request->ip())['timezone'];
        $timeSlotSplit = explode('-', $request->time_slot);
        $start = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[0], 'UTC')
            ->format('Y-m-d H:i:s');
        $end = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[1], 'UTC')
            ->format('Y-m-d H:i:s');

//        $appointments = Appointment::all()
//            ->where('expert_id', $request->id)
//            ->where('begin','<',$start)
//            ->where('end','<=',$start);
//        return $appointments->count();
        return DB::table('appointments')
            ->where('expert_id',$request->id)
            ->where('begin','>',$start)
            ->where('begin','>=',$end)->get();
//            ->orWhere(function ($query)use ($start,$end,$request){
//                $query
//                    ->where('expert_id',$request->id)
//                    ->where('begin','<',$start);
////                    ->where();
//            })->get();
//        return DB::query()
//            ->from('appointments')
//            ->whereBetween(\DB::raw('DATE(end)'), [$start, $end])
//            ->count();
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
            $timezone = geoip($request->ip())['timezone'];
            $timeSlotSplit = explode('-', $request->time_slot);
//            $start = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[0], 'UTC')
//                ->format('Y-m-d H:i:s e');
//            $end = convertDateToAnotherTimeZone($request->begin . ' ' . $timeSlotSplit[1], 'UTC')
//                ->format('Y-m-d H:i:s e');
            $start = $request->begin . ' ' . $timeSlotSplit[0];
            $end = $request->begin . ' ' . $timeSlotSplit[1];
//            return [$start, $end];
            $expert = User::find($request->expert_id);
            $appointment = Appointment::create([
                'client_id' => $request->client_id,
                'expert_id' => $request->expert_id,
                'time_slot' => $request->time_slot,
                'begin' => $start,
                'end' => $end,
                'duration' => $request->duration
            ]);
            return $appointment;
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
