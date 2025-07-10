<?php

namespace App\Http\Controllers;

use App\Models\ProductOffer;
use Illuminate\Http\Request;

class ProductOfferController extends Controller
{
    public function index()
    {
        $offers = ProductOffer::with('product')->get();

        return response()->json([
            'status' => 'success',
            'data' => $offers,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $offer = ProductOffer::create($request->only([
            'product_id',
            'discount_percent',
            'start_date',
            'end_date',
        ]));

        return response()->json([
            'status' => 'success',
            'data' => $offer,
        ], 201);
    }


    public function update(Request $request, ProductOffer $productOffer)
    {
        $request->validate([
            'discount_percent' => 'numeric|min:0|max:100',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
        ]);

        $productOffer->update($request->only([
            'discount_percent',
            'start_date',
            'end_date',
        ]));

        return response()->json([
            'status' => 'success',
            'data' => $productOffer,
        ]);
    }

    /**
     * حذف عرض.
     */
    public function destroy(ProductOffer $productOffer)
    {
        $productOffer->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product offer deleted successfully',
        ]);
    }
}
