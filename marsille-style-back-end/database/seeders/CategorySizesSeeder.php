<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Size;

class CategorySizesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sizes = ['S', 'M', 'L', 'XL'];

        foreach ($sizes as $size) {
            Size::create([
                'category_id' => 1, 
                'name' => $size,
            ]);
        }

        $shoeSizes = [40, 41, 42, 43];
        foreach ($shoeSizes as $size) {
            Size::create([
                'category_id' => 3,
                'name' => $size,
            ]);
        }
    }
}
