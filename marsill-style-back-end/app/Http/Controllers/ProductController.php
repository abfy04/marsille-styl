<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category'])->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|string|max:2048',
            'isShow' => 'sometimes|boolean',
            'category_id' => 'required|exists:categories,id',
            'sizes' => 'json|nullable',
            'colors' => 'json|nullable',
            'isOffred' => 'sometimes|boolean',
            'offredPrice' => 'sometimes|nullable|numeric|min:0',
            'startOffreDay' => 'sometimes|nullable|date',
            'endOffreDay' => 'sometimes|nullable|date|after_or_equal:startOffreDay',
        ]);
        $image = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('productImages', 'public');

        }
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'sizes' => $request->sizes,
            'colors' => $request->colors,
            'isShow' =>  true,
            'image' => "storage/{$image}",
            'category_id' => $request->category_id,
            'isOffred' => false,
            'offredPrice' => null,
            'startOffreDay' => null,
            'endOffreDay' => null,
        ]);

        return response()->json([
            'product' => $product->load('colors','sizes')
        ]);
            }

    public function offer(Request $request, $id)
    {
        $request->validate([
            'isOffred' => 'required|boolean',
            'offredPrice' => 'nullable|numeric|min:0',
            'startOffreDay' => 'nullable|date',
            'endOffreDay' => 'nullable|date|after_or_equal:startOffreDay',
        ]);
        $product = Product::findOrFail($id);
        $product->isOffred = $request->isOffred;
        $product->offredPrice = $request->offredPrice;
        $product->startOffreDay = $request->startOffreDay;
        $product->endOffreDay = $request->endOffreDay;
        $product->save();
        return response()->json(['message' => 'Offer updated successfully', 'product' => $product]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'image' => 'nullable|image|file|max:2048',
            'isShow' => 'sometimes|boolean',
            'category_id' => 'sometimes|required|exists:categories,id',
            'sizes' => 'nullable|json',
            'colors' => 'nullable|json',
        ]);
        $product = Product::findOrFail($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('productImages', 'public');
            $product->image = "storage/{$image}";
        }
        if ($request->has('name')) $product->name = $request->name;
        if ($request->has('price')) $product->price = $request->price;
        if ($request->has('stock')) $product->stock = $request->stock;
        if ($request->has('isShow')) $product->isShow = $request->isShow;
        if ($request->has('category_id')) $product->category_id = $request->category_id;
        if ($request->has('sizes')) $product->sizes = $request->sizes;
        if ($request->has('colors')) $product->colors = $request->colors;
        $product->save();
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
