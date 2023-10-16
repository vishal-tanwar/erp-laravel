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
            $table->integer('supplier_id')->nullable();
            $table->string('voucher_number')->nullable();
            $table->string('invoice_id', 255 )->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('email');
            $table->string('phone_number');
            $table->string('department')->nullable();
            $table->string('requester')->nullable();
            $table->timestamp('receiving_date')->nullable();
            $table->timestamp('issuance_date')->nullable();
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
