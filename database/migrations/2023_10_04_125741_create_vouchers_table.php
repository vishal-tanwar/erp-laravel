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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['issuance', 'receiving']);
            $table->integer('store_id');
            $table->integer('supplier_id');
            $table->string('voucher_number')->nullable();
            $table->string('invoice_id', 255 );
            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('email');
            $table->string('phone_number');
            $table->timestamp('receiving_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
