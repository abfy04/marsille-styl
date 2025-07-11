<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('register', [UserController::class, 'Register']);
Route::post('login', [UserController::class, 'Login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [UserController::class, 'getUserData']);
    Route::post('logout', [UserController::class, 'Logout']);
});

Route::apiResource('products', App\Http\Controllers\ProductController::class);
Route::apiResource('categories', App\Http\Controllers\CategoryController::class);


