<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DraftSale extends Model
{
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'date', 'Ref','client_id', 'GrandTotal', 'TaxNet', 'tax_rate',
         'warehouse_id', 'user_id', 'discount', 'shipping',
         'created_at', 'updated_at', 'deleted_at',
         'manual_gst_amount', 'packaging_forwarding_charge', 'manual_gst_percent',
    ];

    protected $casts = [
        'GrandTotal' => 'double',
        'user_id' => 'integer',
        'client_id' => 'integer',
        'warehouse_id' => 'integer',
        'discount' => 'double',
        'shipping' => 'double',
        'TaxNet' => 'double',
        'tax_rate' => 'double',
        'manual_gst_amount' => 'double',
        'packaging_forwarding_charge' => 'double',
        'manual_gst_percent' => 'double',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function details()
    {
        return $this->hasMany('App\Models\DraftSaleDetail');
    }

    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }

    public function warehouse()
    {
        return $this->belongsTo('App\Models\Warehouse');
    }

}
