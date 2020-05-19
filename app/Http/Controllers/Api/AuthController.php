<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use mysql_xdevapi\Exception;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validation = $request->validate([
                'email' => 'required',
                'password' => 'required'
            ]);
            $user = User::where('email', $request['email'])
                ->first();
            if (is_null($user)) {
                throw new \Exception('User Not Found');
            }
            // update user timezone on login
            $timezone = geoip(getClientIp())['timezone'];
            $user->timezone=$timezone;
            $user->save();
            if (Hash::check($request['password'], $user->password)) {
                $token = $user->createToken($request['email'])->plainTextToken;
                return response()->json([
                    'data' => [
                        'token' => $token,
                        'info' => $user
                    ],
                    'errors' => ''
                ], 200);
            } else {
                return response()->json([
                    'data' => '',
                    'errors' => 'wrong email or password'
                ], 422);
            }
        } catch (\Exception $ex) {
            return response()->json([
                'data' => '',
                'errors' => $ex->getMessage()
            ], 422);
        }
    }

    public function register(Request $request)
    {
        try {
            $validation = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);
            $userLocationInfo = geoip(getClientIp());
            $country = $userLocationInfo['country'];
            $timezone = $userLocationInfo['timezone'];
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'country' => $country,
                'timezone' => $timezone,
                'password' => Hash::make($request['password']),
            ]);
            $token = $user->createToken($request['email'])->plainTextToken;
            return response()->json([
                'data' => [
                    'token' => $token,
                    'info' => $user
                ],
                'errors' => ''
            ], 200);

        } catch (\Exception $ex) {
            return response()->json([
                'data' => '',
                'errors' => $ex->getMessage()
            ], 422);
        }
    }
}
