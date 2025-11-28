<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_code',
        'description',
        'origin_address',
        'destination_address',
        'subtotal',
        'total',
        'status',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function updates()
    {
        return $this->hasMany(TrackingUpdate::class)
                    ->latest();
    }
}
