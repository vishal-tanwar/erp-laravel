<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use App\Models\VoucherItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VouchersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request )
    {

        $vouchers = Voucher::with(['store', 'supplier','items']);

        if ($request->get('store') || $request->get('store_id') ) {
            $store_id = $request->get('store') ?? $request->get('store_id');
            $vouchers->where('store_id', "=", $store_id);
        }

        $vouchers = $vouchers->get()->toArray();


        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Vouchers fetched successfully',
            'data' => [
                "vouchers" => $vouchers,
                // "rece" => $vouchers->items
            ],
        ]);
        
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $items = $request->items;
        $voucherReq = $request->all();
        unset($voucherReq['items']);
        $voucher = Voucher::create($voucherReq);

        $items = array_map( function( $item ) use ($voucher) {
            if( is_array( $item ) ){
                $item = json_decode( json_encode ($item ) );
            } 
            return [
                "voucher_id" => $voucher->id,
                'item_id' => $item->id,
                'quantity' => $item->quantity,
                "location_id" =>  $item->location_id,
                "total_gwt"=> $item->total_gwt,
                "total_pkt"=> $item->total_pkt,
                "pkt_receiver"=> $item->pkt_receiver
            ];
        }, $items );

        VoucherItem::insert( $items );

        return response()->json([
            "success" => true,
            "code" => Response::HTTP_CREATED,
            "data" => [
                'request' => $voucher,
                'items' => $items]
        ], Response::HTTP_CREATED);
    }


    public function view( Request $request ){

        $id = $request->get('id');
        $vouchers = Voucher::with(['store', 'supplier', 'items'])->where('id', "=", $id);


        $vouchers = $vouchers->first();


        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Vouchers fetched successfully',
            'data' =>  $vouchers,
        ]);
    }
   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voucher $voucher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $voucher )
    {
        //
    }


    public function generate_voucher_number(){
        $voucher = Voucher::orderBy('id', 'DESC')->where("type", "=", "receiving")->first();

        $id = $voucher ? $voucher->id + 1 : 1;

        $date = date('my');

        return response()->json([
            "success" => true,
            'data' => "KR-SPL-{$date}-00{$id}",
            "code" => Response::HTTP_OK,
            'message' => 'Store created successfully',
        ]);
    }
}
