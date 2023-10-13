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
    public function index(Request $request)
    {

        $stores = Store::with(['items'])->select('*');

        $pages = 0;



        if ($request->get('page') && $request->get('per_page')) {

            $page = $request->get('page');
            $limit = $request->get('per_page');

            $offset = ($page - 1) * $limit;
            $stores->limit($limit)->offset($offset);
            $pages = Store::all()->count();

            $pages = ceil($pages / $limit);
        }



        $stores = $stores->get();


        return response()->json([
            "success" => true,
            'data' => [
                "stores" => $stores,
                "pages" => $pages
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

        $request->merge(['slug' => Store::slug($request->name)]);

        if ($store = Store::create($request->all())) {

            return response()->json([
                "success" => true,
                'data' => Store::with(['items'])->where('id', "=", $store->id)->first(),
                "code" => Response::HTTP_CREATED,
                'message' => 'Store created successfully',
            ], Response::HTTP_CREATED);
        } else {
            return response()->json([
                "success" => false,
                'data' => $store,
                "code" => Response::HTTP_UNAUTHORIZED,
                'message' => 'There was some error while creating store',
            ], Response::HTTP_UNAUTHORIZED);
        }

    }


    public function show($slug)
    {
        $store = Store::where('slug', $slug)->first()->toArray();

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
    public function update($id, Request $request)
    {   
        $store = Store::find($id);

        $request->merge(['slug' => Store::slug($request->name)]);

        $store->name = $request->name;
        $store->slug = $request->slug;

        $store->save();

        return response()->json([
            "message" => "Store updated Successfully!",
            "code" => Response::HTTP_ACCEPTED,
            "success" => true,
            "data" =>  $store
        ],Response::HTTP_ACCEPTED);
    }


    public function search($keywords = "")
    {
        $stores = Store::with(['items'])->select('*');
        if ($keywords) {

            $stores = $stores->where('name', "LIKE", "%{$keywords}%");
        }

        $stores = $stores->get();

        return response()->json([
            "success" => true,
            'data' => [
                "stores" => $stores,
                "pages" => 0
            ],
            "code" => Response::HTTP_OK,
            'message' => 'Stores fetched successfully',
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $store)
    {


        $store = Store::find($store);
        $store->locations()->delete();
        $store->delete();

        $stores = Store::with(['items'])->select('*');

        $pages = 0;



        if ($request->get('page') && $request->get('per_page')) {

            $page = $request->get('page');
            $limit = $request->get('per_page');

            $offset = ($page - 1) * $limit;
            $stores->limit($limit)->offset($offset);
            $pages = Store::all()->count();

            $pages = ceil($pages / $limit);
        }


        // Delete Store 

        $stores = $stores->get();

        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Store deleted successfully',
            'data' => $stores,
        ], Response::HTTP_OK);
    }
}