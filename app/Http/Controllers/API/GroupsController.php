<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GroupsController extends Controller
{
    public function index()
    {
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Groups fetched successfully',
            'data' => ["groups" => Group::all()]
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $group = Group::create($request->all());
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_CREATED,
            'message' => 'Group created successfully',
            'data' => $group
        ], Response::HTTP_CREATED);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($group)
    {

        Group::destroy($group);
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Group deleted successfully',
            'data' => Group::all(),
        ], Response::HTTP_OK);
    }
}
