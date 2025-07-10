<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'category_id' => 1,
            'name' => 'T-shirt',
            'price' => 200,
            'image' => 'https://example.com/t-shirt.jpg',
            'status' => 'show',
            'stock' => 100,
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Hoodie',
            'price' => 350,
            'image' => 'https://example.com/hoodie.jpg',
            'status' => 'show',
            'stock' => 100,
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Sneakers',
            'price' => 500,
            'image' => 'https://example.com/sneakers.jpg',
            'status' => 'show',
            'stock' => 100,
        ]);

    }
}
