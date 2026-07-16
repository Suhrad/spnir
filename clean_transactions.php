<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$tablesToClear = [
    'sales', 'sale_details',
    'purchases', 'purchase_details',
    'adjustments', 'adjustment_details',
    'transfers', 'transfer_details',
    'quotations', 'quotation_details',
    'sale_returns', 'sale_return_details',
    'purchase_returns', 'purchase_return_details',
    'payment_sales', 'payment_purchases', 'payment_sale_returns', 'payment_purchase_returns',
    'shipments', 'expenses', 'deposits', 'payrolls', 'attendances', 'leaves',
    'draft_sales', 'draft_sale_details', 'online_orders', 'online_order_items',
    'messages', 'sms_messages', 'email_messages', 'error_logs'
];

echo "Cleaning transaction tables...\n";
foreach ($tablesToClear as $table) {
    if (Schema::hasTable($table)) {
        DB::table($table)->delete();
        echo "Cleared table: $table\n";
    }
}

echo "Resetting warehouse stock quantities to 0...\n";
if (Schema::hasTable('product_warehouse')) {
    DB::table('product_warehouse')->update(['qte' => 0]);
    echo "Reset product_warehouse stock to 0.\n";
}

echo "Database cleaned successfully!\n";
