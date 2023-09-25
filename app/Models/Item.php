<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;


    protected $fillable = [
        "name",
        "size",
        "part",
        "grade",
        "group",
        "sub_group",
        "store_id",
        "unit",
        "suppliers"
    ];


    public function group() {
        return $this->belongsTo(Group::class, 'group');
    }
    public function sub_group() {
        return $this->belongsTo(SubGroup::class, 'sub_group');
    }
    public function unit() {
        return $this->belongsTo(Unit::class, 'unit');
    }
}