<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $hidden = [
        'store_id',
        'supplier_id'
    ];

    protected $fillable = [
        'type',
        'store_id',
        'supplier_id',
        'voucher_number',
        'invoice_id',
        'address',
        'city',
        'state',
        'email',
        'phone_number',
        'receiving_date',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    
    public function items()
    {
        return $this->hasMany(VoucherItem::class)->with(['item', 'location']);
    }

    public function inventories(){
        return $this->hasMany(Inventory::class)->with(['item', 'location', 'store', 'voucher']);
    }
}