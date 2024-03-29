<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request )
    {
        $locations = Location::with(['store']);

        if($request->get('store_id')){
            $locations->where('store_id', "=", $request->get('store_id'));
        }

        $pages = 0;



        if ($request->get('page') && $request->get('per_page')) {

            $page = $request->get('page');
            $limit = $request->get('per_page');

            $offset = ($page - 1) * $limit;
            $locations->limit($limit)->offset($offset);
            $pages = Location::all()->count();

            $pages = ceil($pages / $limit);
        }


        

        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Locations fetched successfully',
            'data' => ["locations" => $locations->get(), "pages" => $pages],
        ]);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->merge(['slug' => Location::slug($request->name)]);

        if ($location = Location::create($request->all())) {

            return response()->json([
                "success" => true,
                'data' => Location::with(['store'])->where('id', '=', $location->id )->first(),
                "code" => Response::HTTP_CREATED,
                'message' => 'Store created successfully',
            ], Response::HTTP_CREATED);
        } else {
            return response()->json([
                "success" => false,
                'data' => [],
                "code" => Response::HTTP_UNAUTHORIZED,
                'message' => 'There was some error while creating store',
            ], Response::HTTP_UNAUTHORIZED);
        }
    }

    

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $location = Location::find($id);

        $location->name = $request->name;
        $location->store_id = $request->store_id;
        $location->save();

        return response()->json([
            "message" => "Location updated Successfully!",
            "code" => Response::HTTP_ACCEPTED,
            "success" => true,
            "data" =>  Location::with(['store'])->where("id", "=", $location->id )->first()
        ],Response::HTTP_ACCEPTED);
    }

    public function search($keywords = "")
    {
        $location = Location::with(['store'])->select('*');
        if ($keywords) {

            $location = $location->where('name', "LIKE", "%{$keywords}%");
        }

        $location = $location->get();

        return response()->json([
            "success" => true,
            'data' => [
                "locations" => $location,
                "pages" => 0
            ],
            "code" => Response::HTTP_OK,
            'message' => 'Location fetched successfully',
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $location)
    {
        $location = Location::find($location);
        $location->delete();
        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'locations deleted successfully',
            'data' => Location::with(['store'])->get(),
        ], Response::HTTP_OK);
    }
}
