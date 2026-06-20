<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\EventCategory;
use App\Models\EventAttendance;

class Event extends Model
{
    protected $table = 'events';

    /**
     * Disable auto-incrementing since we are using Supabase UUIDs
     */
    public $incrementing = false;

    /**
     * Set the primary key type to string.
     */
    protected $keyType = 'string';

    protected $fillable = [
        'id', // Required to insert the Supabase UUID
        'user_id',
        'category_id',
        'title',
        'description',
        'date',
        'location',
        'capacity',
        'price',
        'banner_image'
    ];

    public function category() {
        return $this->belongsTo(EventCategory::class, 'category_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function eventAttendances() {
        return $this->hasMany(EventAttendance::class, 'event_id');
    }
}
