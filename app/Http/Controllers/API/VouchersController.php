<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\Voucher;
use App\Models\VoucherItem;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VouchersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $vouchers = Voucher::with(['store', 'supplier', 'items']);

        if ($request->get('store') || $request->get('store_id')) {
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

        $items = array_map(function ($item) use ($voucher) {
            if (is_array($item)) {
                $item = json_decode(json_encode($item));
            }
            return [
                "voucher_id" => $voucher->id,
                'item_id' => $item->id,
                'quantity' => $item->quantity,
                "location_id" => $item->location_id,
                "total_gwt" => $item->total_gwt,
                "total_pkt" => $item->total_pkt,
                "pkt_receiver" => $item->pkt_receiver
            ];
        }, $items);

        VoucherItem::insert($items);

        // Update Inventory

        $inventories = [];
        $now = Carbon::now();

        foreach ($items as $item) {
            $inventories[] = [
                'voucher_id' => $voucher->id,
                'store_id' => $voucherReq["store_id"],
                'item_id' => $item['item_id'],
                'stocks' => abs($item['quantity']),
                'location_id' => $item['location_id'],
                'created_at' => $now->toDateTimeString(),
                'updated_at' => $now->toDateTimeString(),
            ];
        }

        Inventory::insert($inventories);

        return response()->json([
            "success" => true,
            "code" => Response::HTTP_CREATED,
            "data" => [
                'request' => $voucher,
                'items' => $items
            ]
        ], Response::HTTP_CREATED);
    }


    public function view(Request $request)
    {

        $id = $request->get('id');
        $vouchers = Voucher::with(['store', 'supplier', 'items'])->where('id', "=", $id);


        $vouchers = $vouchers->first();


        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Vouchers fetched successfully',
            'data' => $vouchers,
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
    public function destroy($voucher, Request $request)
    {
        $voucher = Voucher::find($voucher);
        $voucher->inventories()->delete();
        $voucher->delete();

        $vouchers = Voucher::with(['store', 'supplier', 'items']);

        if ($request->get('store') || $request->get('store_id')) {
            $store_id = $request->get('store') ?? $request->get('store_id');
            $vouchers->where('store_id', "=", $store_id);
        }

        $vouchers = $vouchers->get()->toArray();

        return response()->json([
            "status" => true,
            "code" => Response::HTTP_OK,
            'message' => 'Voucher deleted successfully',
            'data' => $vouchers,
        ], Response::HTTP_OK);
    }


    public function generate_voucher_number()
    {
        $voucher = Voucher::orderBy('id', 'DESC')->where("type", "=", "receiving")->pluck('voucher_number')->first();

        $voucher = explode("-", $voucher);

        $new = abs(last($voucher)) + 1;
        $date = date('my');

        return response()->json([
            "success" => true,
            'data' => "KR-SPL-{$date}-00{$new}",
            "code" => Response::HTTP_OK,
            'message' => 'Store created successfully',
        ]);
    }


    public function scanning(Request $request): JsonResponse
    {

        $vouchers = Voucher::with(['items'])->where('voucher_number', "=", $request->get('voucher_number'));
        $vouchers = $vouchers->where('store_id','=', $request->get('store_id'));
        $vouchers = $vouchers->where('type','=', 'receiving');

        $vouchers = $vouchers->whereHas('items', function ($query) use ($request) {
            $query->where('id', '=', $request->get('item_id'));   
        });



        // $vouchers = Voucher::with(['items'])->whereHas('items', function ($q) use ($request) {
        //     $q->where([
        //         ['location_id', '=', $request->get('location_id')],
        //         ['item_id', '=', $request->get('item_id')]
        //     ]);
        // });
        // $vouchers = $vouchers->where([
        //     ['store_id', '=', $request->get('store_id')],
        //     ['type', '=', "receiving"],
        // ]);

        $voucher = $vouchers->first();

        $item = $voucher->items()->where('id', '=', $request->get('item_id'))->first();

        return response()->json([
            'success' => true,
            'data' => [
                'voucher' => $voucher,
                "item"  => $item
            ],
            'code' => Response::HTTP_OK,
            'message' => 'Item Fetched',
        ], Response::HTTP_OK);
    }
    
}