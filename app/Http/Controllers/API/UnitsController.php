<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UnitsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            "status"    => true,
            "code"  => Response::HTTP_OK,
            'message' => 'Units fetched successfully',
            'data' => [ "units" => Unit::all() ]
        ]);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

       $unit =  Unit::create($request->all());
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_CREATED,
            'message' => 'Unit created successfully',
            'data' => $unit
        ], Response::HTTP_CREATED );
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($unit)
    {   
        
        Unit::destroy( $unit );
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Unit deleted successfully',
            'data' => Unit::all(),
        ], Response::HTTP_OK);
    }
}
