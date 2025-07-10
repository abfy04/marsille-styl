<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = ['name', 'hex_code'];

    // Many to many with Product
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_colors')->withTimestamps();
    }
}
