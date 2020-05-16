<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ExpertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userLocationInfo = geoip(request()->ip());
        $timezone = $userLocationInfo['timezone'];
        $experts = User::expert()->with('expertAppointments')->get();
        $experts->map(function ($a) use ($timezone) {
            $a->expert_start_time = getTimeFromTimeZone($a->expert_start_time, $timezone);
            $a->expert_end_time = getTimeFromTimeZone($a->expert_end_time, $timezone);
            $a->time_slot = getTimeSlot($a->expert_start_time, $a->expert_end_time, '15');
            return $a;
        });
        return $experts;
    }

    public function updateTimeSlot(Request $request)
    {
        $userLocationInfo = geoip(request()->ip());
        $timezone = $userLocationInfo['timezone'];
        $experts = User::all()->where('id', $request->id);
        return $experts->map(function ($a) use ($timezone,$request) {
            $a->expert_start_time = getTimeFromTimeZone($a->expert_start_time, $timezone);
            $a->expert_end_time = getTimeFromTimeZone($a->expert_end_time, $timezone);
            $a->time_slot = getTimeSlot($a->expert_start_time, $a->expert_end_time, $request->duration);
            return $a;
        })->first();;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
