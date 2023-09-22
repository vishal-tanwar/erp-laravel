<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api", ["except" => ["login", "verifySession"]]);
    }

    /**
     * API method to log in the user
     * 
     * @param \Request $request
     * 
     * @return JsonResponse
     * 
     */

     public function login( Request $request ): JsonResponse{

        $login = $request->username;

        $type = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if($type == "email" ){
            $request->merge([ "email" => Str::lower($login ) ] );
        }

        $credentials = $request->only([$type, 'password']);

        $validator = Validator::make($credentials, [
            $type => "required|string|exists:users,{$type}",
            'password' => 'required|string',
        ]);


        if( $validator->fails() ){
            return response()->json([
                "success" => false,
                "code" => Response::HTTP_UNAUTHORIZED,
                "message" => $validator->messages()->get($type),
                "data" => [
                    $request->all()
                ]
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                "success" => false,
                "code" => Response::HTTP_UNAUTHORIZED,
                "message" => "Invalid Password!",
                "data"  => []
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
        return response()->json([
            "success" => true,
            "code" => Response::HTTP_OK,
            "message" => "User has logged in successfully!",
            "data" => [
                'user' => $user,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]
        ], Response::HTTP_OK);

     }

    public function register(Request $request)
    {
        if ($request->email) {
            $request->merge(["email" => Str::lower($request->email)]);
        }

        $request->validate([
            'firstname'     => 'required|string|max:255',
            'lastname'      => 'string|max:255',
            'phone'         => 'required|numeric|min:10|max:10',
            'email'         => 'required|string|email|max:255|unique:users',
            'password'      => 'required|confirmed|string|min:6',
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            "status"    => true,
            "code"  => Response::HTTP_CREATED,
            'message' => 'User created successfully',
            'data' => [ "user" => $user ]
        ], Response::HTTP_CREATED);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            "success" => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Verify JWT token weather it is valid or not
     * 
     * @method verifySession()
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function verifySession(): JsonResponse
    {   

        return response()->json([
            "success" => true,
            "code" => Response::HTTP_OK,
            "message" => "User is valid",
            "data" => [
                "valid" => Auth::check()
            ]
        ]);
    }
    
}

