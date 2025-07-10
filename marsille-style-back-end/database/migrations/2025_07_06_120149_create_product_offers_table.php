<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('product_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('discount_percent');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
        });
    }

    public function down(): void {
        Schema::dropIfExists('product_offers');
    }
};

