<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherItem extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $hidden = [
        'voucher_id',
        "item_id",
        "location_id"
    ];

    protected $fillable = [
        'voucher_id',
        'item_id',
        'quantity',
        'location_id',
        'total_gwt',
        'total_pkt',
        'pkt_receiver',
        'voucher_parent_id'
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class)->with('store');
    }
}