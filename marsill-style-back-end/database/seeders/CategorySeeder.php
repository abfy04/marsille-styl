<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'T-Shirts',
            'image' => 'https://example.com/tshirt.jpg',
            'sizes' => ['S', 'M', 'L', 'XL'],
        ]);

        Category::create([
            'name' => 'Hoodies',
            'image' => 'https://example.com/hoodie.jpg',
            'sizes' => ['S', 'M', 'L', 'XL'],   
        ]);

        Category::create([
            'name' => 'Sneakers',
            'image' => 'https://example.com/sneakers.jpg',
            'sizes' => ['S', 'M', 'L', 'XL'],
        ]);

        Category::create([
            'name' => 'Accessories',
            'image' => 'https://example.com/accessories.jpg',
            'sizes' => ['S', 'M', 'L', 'XL'],
        ]);
    }
}
