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
        Schema::table('sales', function (Blueprint $table) {
            $table->double('manual_gst_percent')->nullable()->default(0)->after('GrandTotal');
        });

        Schema::table('draft_sales', function (Blueprint $table) {
            $table->double('manual_gst_percent')->nullable()->default(0)->after('GrandTotal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn('manual_gst_percent');
        });

        Schema::table('draft_sales', function (Blueprint $table) {
            $table->dropColumn('manual_gst_percent');
        });
    }
};
