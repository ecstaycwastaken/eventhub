<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User;
use App\Models\EventCategory;
use App\Models\EventAttendance;

class Event extends Model
{
    use HasUuids;
    
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
        'venue',
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

    public function getEventHost() {
        $host_id = $this->eventAttendances()->where('status', 'host')->value('user_id');
        $user = User::find($host_id);
        return $user ? $user->full_name : null;
    }

    public function isHost(string $user_id) {
        return $this->eventAttendances()->where('user_id', $user_id)->where('status', 'host')->exists();
    }
}
