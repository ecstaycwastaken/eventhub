<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;
use App\Models\User;

class EventAttendance extends Model
{
    protected $table = 'event_attendances';

    /**
     * Disable auto-incrementing since we are using Supabase UUIDs
     */
    public $incrementing = false;

    /**
     * Set the primary key type to string.
     */
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'event_id',
        'status',
        'code'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function event() {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function isEventHost() {
        return $this->status === 'host';
    }
}
