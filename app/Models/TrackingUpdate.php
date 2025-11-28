<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrackingUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'person_name',
        'location',
        'arrived_ok',
        'notes',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
