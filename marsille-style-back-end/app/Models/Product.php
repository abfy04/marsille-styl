<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'stock',
        'image',
        'status',
        'category_id',
    ];

    // Product belongs to one category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Many to many with Size
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes')->withTimestamps();
    }

    // Many to many with Color
    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_colors')->withTimestamps();
    }

    // One product has many offers
    public function offers()
    {
        return $this->hasMany(ProductOffer::class);
    }
}
