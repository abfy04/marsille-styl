<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::with('products')->get();
        return response()->json($colors);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'hex_code' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'], 
        ]);

        $color = Color::create([
            'name' => $request->name,
            'hex_code' => $request->hex_code,
        ]);

        return response()->json(['message' => 'Color created successfully', 'color' => $color], 201);
    }

    public function show($id)
    {
        $color = Color::with('products')->findOrFail($id);
        return response()->json($color);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'hex_code' => ['sometimes', 'required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ]);

        $color = Color::findOrFail($id);
        $color->update($request->only(['name', 'hex_code']));

        return response()->json(['message' => 'Color updated successfully', 'color' => $color]);
    }

    public function destroy($id)
    {
        $color = Color::findOrFail($id);
        $color->products()->detach(); 
        $color->delete();

        return response()->json(['message' => 'Color deleted successfully']);
    }
}
