<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierContact extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        "supplier_id",
        "name",
        "designation",
        "email",
        "phone",
        "created_at",
        "updated_at"
    ];

    /**
     * Get the own Supplier
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     * 
     */

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, "supplier_id");
    }
}