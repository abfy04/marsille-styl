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
            'isShow' => true,
            'stock' => 100,
            'colors' => ['red', 'blue', 'green'],
            'sizes' => ['S', 'M', 'L', 'XL'],
            'isOffred' => false,
            'offredPrice' => null,
            'startOffreDay' => null,
            'endOffreDay' => null,
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Hoodie',
            'price' => 350,
            'image' => 'https://example.com/hoodie.jpg',
            'isShow' => true,
            'stock' => 100,
            'colors' => ['red', 'blue', 'green'],
            'sizes' => ['S', 'M', 'L', 'XL'],
            'isOffred' => false,
            'offredPrice' => null,
            'startOffreDay' => null,
            'endOffreDay' => null,
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Sneakers',
            'price' => 500,
            'image' => 'https://example.com/sneakers.jpg',
            'isShow' => true,
            'stock' => 100,
            'colors' => ['red', 'blue', 'green'],
            'sizes' => ['S', 'M', 'L', 'XL'],
            'isOffred' => true,
            'offredPrice' => 450,
            'startOffreDay' => '2025-07-10',
            'endOffreDay' => '2025-07-15',
        ]);

    }
}
