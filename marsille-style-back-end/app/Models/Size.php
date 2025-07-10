<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Category;

class Size extends Model
{
    protected $fillable = [
        'name',
        'category_id'
    ];

    // Many to many with Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Many to many with Product
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_id')->withTimestamps();
    }
}
