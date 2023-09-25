<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            "success" => true,
            'data' => [
                "stores" => Store::all()
            ],
            "code" => Response::HTTP_OK,
            'message' => 'Stores fetched successfully',
        ], Response::HTTP_OK);
    }

   
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   

        $request->merge( ['slug' => Store::slug( $request->name )] );

        if( $store = Store::create( $request->all() )){

            return response()->json([
                "success" => true,
                'data' => $store,
                "code" => Response::HTTP_CREATED,
                'message' => 'Store created successfully',
            ], Response::HTTP_CREATED);
        }

        else{
            return response()->json([
                "success" => false,
                'data' => $store,
                "code" => Response::HTTP_UNAUTHORIZED,
                'message' => 'There was some error while creating store',
            ], Response::HTTP_UNAUTHORIZED);
        }

    }


    public function show( $slug ) {
        $store = Store::where( 'slug', $slug )->get()->toArray();

        return response()->json([
            "success" => is_array($store) && !empty($store),
            'data' => $store,
            "code" => Response::HTTP_OK,
            'message' => 'Store Fetched successfully',
        ], Response::HTTP_OK);
    }

   


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        //
    }
}
