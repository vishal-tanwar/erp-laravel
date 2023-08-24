<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        "firm_name",
        "address",
        "email",
        "tel_country_code",
        "tel_std_code",
        "tel_number",
        "fax_country_code",
        "fax_std_code",
        "fax_number",
        "country_code",
        "number",
        "website",
        "company_nature",
        "business_nature",
        "is_iso_resgitered",
        "related_working",
        "company_size",
        "established_year",
        "investment_value",
        "registration_number",
        "registration_date",
        "gst_number",
        "gst_reg_date",
        "pan",
        "pan_reg_date",
        "receipt_date",
        "have_certification_copy",
        "created_at",
        "updated_at"
    ];


    /**
     * Get the all contacts of supplier
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function contacts(): HasMany
    {
        return $this->hasMany(SupplierContact::class, "supplier_id");
    }
}