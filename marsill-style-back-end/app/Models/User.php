<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    protected $fillable = [
        'name',
        'phone',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
    ];
}
