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
            $table->double('manual_gst_amount')->nullable()->default(0)->after('GrandTotal');
            $table->double('packaging_forwarding_charge')->nullable()->default(0)->after('manual_gst_amount');
        });

        Schema::table('draft_sales', function (Blueprint $table) {
            $table->double('manual_gst_amount')->nullable()->default(0)->after('GrandTotal');
            $table->double('packaging_forwarding_charge')->nullable()->default(0)->after('manual_gst_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn(['manual_gst_amount', 'packaging_forwarding_charge']);
        });

        Schema::table('draft_sales', function (Blueprint $table) {
            $table->dropColumn(['manual_gst_amount', 'packaging_forwarding_charge']);
        });
    }
};
