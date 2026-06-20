<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Event;

class EventCategory extends Model
{
    use HasUuids;
    
    protected $table = 'event_categories';

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
        'name',
        'color'
    ];

    public function events() {
        return $this->hasMany(Event::class, 'category_id');
    }
}
