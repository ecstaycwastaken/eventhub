<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Event;
use App\Models\EventAttendance;

class User extends Authenticatable
{
    use HasUuids;

    protected $table = 'users';

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
        'username',
        'first_name',
        'last_name',
        'email',
        'contact_number',
        'country',
        'region',
        'city',
        'role',
        'profile_image'
    ];

    public function getFullNameAttribute() {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name);
    }
    
    public function events() {
        return $this->hasMany(Event::class, 'user_id');
    }

    public function eventAttendances() {
        return $this->hasMany(EventAttendance::class, 'user_id');
    }
}