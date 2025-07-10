<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    
    public function index()
    {
        $sizes = Size::with(['category'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $sizes,
        ]);
    }

 
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $size = Size::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $size,
        ], 201);
    }


    public function update(Request $request, Size $size)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
        ]);
        $size->update($request->only(['name', 'category_id']));
        return response()->json([
            'status' => 'success',
            'data' => $size,
        ]);
    }

    public function destroy(Size $size)
    {
        $size->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Size deleted successfully',
        ]);
    }
}
