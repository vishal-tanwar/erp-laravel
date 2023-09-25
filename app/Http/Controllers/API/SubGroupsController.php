<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SubGroup;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SubGroupsController extends Controller
{
    public function index()
    {
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Sub Groups fetched successfully',
            'data' => ["groups" => SubGroup::all()]
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $group = SubGroup::create($request->all());
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_CREATED,
            'message' => 'Sub Group created successfully',
            'data' => $group
        ], Response::HTTP_CREATED);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubGroup $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($group)
    {

        SubGroup::destroy($group);
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Group deleted successfully',
            'data' => SubGroup::all(),
        ], Response::HTTP_OK);
    }
}
