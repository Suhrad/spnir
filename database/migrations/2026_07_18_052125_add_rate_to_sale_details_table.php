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
        Schema::table('sale_details', function (Blueprint $table) {
            $table->float('rate', 10, 2)->nullable()->after('price');
        });

        Schema::table('draft_sale_details', function (Blueprint $table) {
            $table->float('rate', 10, 2)->nullable()->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_details', function (Blueprint $table) {
            $table->dropColumn('rate');
        });

        Schema::table('draft_sale_details', function (Blueprint $table) {
            $table->dropColumn('rate');
        });
    }
};
