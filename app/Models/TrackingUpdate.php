<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrackingUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'name_from_form',
        'location_lat',
        'location_lng',
        'comment',
        'status_update',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
