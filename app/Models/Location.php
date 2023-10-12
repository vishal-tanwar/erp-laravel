<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $hidden = [
        'store_id',
    ];

    protected $fillable = [
        'store_id',
        'name'
    ];

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
