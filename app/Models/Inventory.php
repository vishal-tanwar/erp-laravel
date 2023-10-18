<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;


    protected $fillable = [
        "location_id",
        "item_id",
        "store_id",
        "stocks",
    ];


    public function item(){
        return $this->belongsTo(Item::class);
    }

    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function store(){
        return $this->belongsTo(Store::class);
    }
    public function voucher(){
        return $this->belongsTo(Voucher::class);
    }

}
