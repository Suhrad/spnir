<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'adresse',
        'email',
        'phone',
        'country',
        'city',
        'tax_number',
        'deleted_at',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'code' => 'integer',
        'adresse' => 'string',
        'email' => 'string',
        'phone' => 'string',
        'country' => 'string',
        'city' => 'string',
        'tax_number' => 'string',
        'deleted_at' => 'datetime',
    ];
}