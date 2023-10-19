<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\VoucherItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InventoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $inventories = Inventory::with(['item', 'location', 'store', 'voucher'])->select('*');

        $pages = 0;



        if ($request->get('page') && $request->get('per_page')) {

            $page = $request->get('page');
            $limit = $request->get('per_page');

            $offset = ($page - 1) * $limit;
            $inventories->limit($limit)->offset($offset);
            $pages = Inventory::all()->count();

            $pages = ceil($pages / $limit);
        }

        if( $request->get("where")  ){
            foreach( $request->get("where") as $column => $value ){
                $inventories->where($column, "=", $value );
            }
        }



        $inventories = $inventories->get();


        return response()->json([
            "success" => true,
            'data' => [
                "inventories" => $inventories,
                "pages" => $pages
            ],
            "code" => Response::HTTP_OK,
            'message' => 'Inventories fetched successfully',
        ], Response::HTTP_OK);
    }


    public function all(){
        $inventory = Inventory::select('id', 'stocks');
        return response()->json([
            "success" => true,
            'data' => ["count" => $inventory->count(), "all" => $inventory->get()],
            "code" => Response::HTTP_OK,
            'message' => 'Inventories fetched successfully',
        ], Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $where = [];

        foreach( $request->get("where") as $column => $value ){
            $where[] = [ $column, "=", $value ];
        }

        $inventory = Inventory::where($where);

        if($inventory->count() > 0 ){

            $inventory = $inventory->first();
            $inventory->stocks = $inventory->stocks + $request->stocks;
            $inventory->save();
        }
        else{
            $inventory = Inventory::create([
                "location_id" => $request->get('where')['location_id'],
                "store_id" => $request->get('where')['store_id'],
                "item_id" => $request->get('where')['item_id'],
                "stocks" => $request->stocks
            ]);
        }

        return response()->json([
            "success" => !!$inventory->first(),
            "code" => Response::HTTP_CREATED,
            "data" => $inventory->first(),
            "message"   => "Inventory has been updated"
        ], Response::HTTP_CREATED);

        
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

        $inventory = Inventory::select("*");


        if($request->where){
            foreach( $request->where as $column => $value ){
                $inventory->where( $column, "=", $value );
            }
        }


        return response()->json([
            "success" => !!$inventory->first(),
            "code" => Response::HTTP_OK,
            "data" => $inventory->first()
        ]);
    }

    public function update( $id, Request $request ){

        $inventory = Inventory::find($id);
        $inventory->stocks =  $inventory->stocks + $request->stocks;
        $inventory->save();

        $voucherItem = VoucherItem::where('voucher_id', "=", $inventory->voucher_id);
        $voucherItem = $voucherItem->where("location_id", "=", $inventory->location_id)->first();
        $voucherItem->quantity = $inventory->stocks;
        $voucherItem->save();

        $inventories = Inventory::with(['item', 'location', 'store', 'voucher'])->select('*');

        $pages = 0;

        if ($request->get('page') && $request->get('per_page')) {

            $page = $request->get('page');
            $limit = $request->get('per_page');

            $offset = ($page - 1) * $limit;
            $inventories->limit($limit)->offset($offset);
            $pages = Inventory::all()->count();

            $pages = ceil($pages / $limit);
        }

        if ($request->get("where")) {
            foreach ($request->get("where") as $column => $value) {
                $inventories->where($column, "=", $value);
            }
        }



        $inventories = $inventories->get();


        return response()->json([
            "success" => true,
            'data' => [
                "inventories" => $inventories,
                "pages" => $pages
            ],
            "code" => Response::HTTP_OK,
            'message' => 'Inventories fetched successfully',
        ], Response::HTTP_OK);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}