<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'sizes', 'colors', 'offers'])->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|url',
            'status' => 'required|in:show,hide',
            'category_id' => 'required|exists:categories,id',
            'sizes' => 'array|exists:sizes,id',
            'colors' => 'array|exists:colors,id',
        ]);
        $image = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('productImages', 'public');

           
        }
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'status' => $request->status,
            'image' => $image,
            'category_id' => $request->category_id,
        ]);
        
        if ($request->has('sizes')) {
            $product->sizes()->sync($request->sizes ?? []);
        }

        if ($request->has('colors')) {
       $product->colors()->sync($request->colors ?? []);
        }

        return response()->json([
            'product' => $product->load('colors','sizes')
        ]);
            }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'image' => 'required|url',
            'status' => 'sometimes|required|in:active,inactive',
            'category_id' => 'sometimes|required|exists:categories,id',
            'sizes' => 'sometimes|array|exists:sizes,id',
            'colors' => 'sometimes|array|exists:colors,id',
        ]);
        $image = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('productImages', 'public');
        }

        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'status' => $request->status,
            'image' => $image,
            'category_id' => $request->category_id,
        ]);

        if ($request->has('colors')) {
            $product->colors()->sync($request->colors);
        }

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->colors()->detach();
        $product->media()->delete();
        $product->offers()->delete();
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
