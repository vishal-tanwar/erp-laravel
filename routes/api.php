<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GroupsController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\SubGroupsController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\UnitsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


/**
 * API Version 1.0 Group v1 with prefix v1
 * 
 * @example /api/v1/{endpoint}
 * 
 * @version 1.0
 * 
 * @since v1.0
 * 
 */

Route::group(["prefix" => "v1"], function(){

    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('/validate-session', [AuthController::class, "verifySession"]);

    Route::resource("supplier", SupplierController::class );


    Route::controller(ItemController::class)->group( function(){
        Route::get('items', 'index');
        Route::post('item', 'store' );
        Route::match(['put', 'patch'], 'item/{id}', 'update');
        Route::delete('item/{id}', 'destroy');
    });

    Route::controller(UnitsController::class)->group( function(){
        Route::get('units', 'index');
        Route::post('unit', 'store' );
        Route::match(['put', 'patch'], 'unit/{id}', 'update');
        Route::delete('unit/{id}', 'destroy');
    });

    Route::controller(GroupsController::class)->group( function(){
        Route::get('groups', 'index');
        Route::post('group', 'store' );
        Route::match(['put', 'patch'], 'group/{id}', 'update');
        Route::delete('group/{id}', 'destroy');
    });

    Route::controller(SubGroupsController::class)->group( function(){
        Route::get('sub-groups', 'index');
        Route::post('sub-group', 'store' );
        Route::match(['put', 'patch'], 'sub-group/{id}', 'update');
        Route::delete('sub-group/{id}', 'destroy');
    });
});
