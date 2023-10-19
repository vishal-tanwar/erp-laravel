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
        Schema::create('voucher_items', function (Blueprint $table) {
            $table->id();
            $table->integer('voucher_id');
            $table->integer('item_id');
            $table->string('quantity');
            $table->string('total_gwt');
            $table->string('total_pkt');
            $table->string('pkt_receiver')->nullable();
            $table->string('location_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_items');
    }
};
