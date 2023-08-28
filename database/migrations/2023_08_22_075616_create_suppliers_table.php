<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string("firm_name");
            $table->string("address");
            $table->string("email");
            $table->string("tel_country_code");
            $table->string("tel_std_code");
            $table->string("tel_number");
            $table->string("fax_country_code");
            $table->string("fax_std_code");
            $table->string("fax_number");
            $table->string("country_code");
            $table->string("number");
            $table->string("website")->nullable();
            $table->string("company_nature")->nullable();
            $table->string("business_nature")->nullable();
            $table->string("is_iso_resgitered")->nullable();
            $table->string("related_working")->nullable();
            $table->string("company_size");
            $table->string("established_year");
            $table->string("investment_value")->nullable();
            $table->string("registration_number");
            $table->dateTime("registration_date");
            $table->string("gst_number");
            $table->string("gst_reg_date");
            $table->string("pan");
            $table->string("pan_reg_date");
            $table->dateTime("receipt_date")->nullable();
            $table->string("have_certification_copy")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
