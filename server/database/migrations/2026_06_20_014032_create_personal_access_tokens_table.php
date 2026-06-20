<?php
/**
 * Ignore this file. This is a default migration file created by Laravel Breeze for handling personal access tokens. 
 * It is not used in our application since we are using Supabase for authentication and token management. 
 * We will rely on Supabase's built-in token management features instead of implementing our own in Laravel. 
 * Therefore, this migration can be safely ignored and does not need to be run or modified.
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->text('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};
