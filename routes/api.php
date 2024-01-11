<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GroupsController;
use App\Http\Controllers\API\InventoriesController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\LocationsController;
use App\Http\Controllers\API\RolesController;
use App\Http\Controllers\API\StoresController;
use App\Http\Controllers\API\SubGroupsController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\UnitsController;
use App\Http\Controllers\API\VouchersController;
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
    
    // User Routes
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
    Route::get("users", [AuthController::class,"users"]);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('/validate-session', [AuthController::class, "verifySession"]);
    Route::get("user/username_exists/{username}", [AuthController::class,"username_exists"]);

    // Roles Routes
    Route::get("/user/roles", [RolesController::class,"index"]);
    Route::post("/user/role", [RolesController::class,"store"]);   
    Route::put("/user/role/{id}", [RolesController::class,"update"])->where(['id' => '[0-9]+']);   
    Route::delete("/user/role/{id}", [RolesController::class,"destroy"])->where(['id' => '[0-9]+']);   
    
    // Permissions Route
    Route::get('/user/role/permissions/{role_id}', [RolesController::class, 'rolePermissions'])->where(['role_id' => "[0-9]+"]);
    Route::post('/user/role/permissions', [RolesController::class, 'syncPermissionsWithRoles']);

    // Route::resource("supplier", SupplierController::class );


    Route::controller(SupplierController::class)->group( function(){
        Route::get('suppliers', 'index');
        Route::post('supplier', 'store' );
        Route::match(['put', 'patch'], 'supplier/{id}', 'update');
        Route::delete('supplier/{id}', 'destroy');
    });

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


    Route::controller(StoresController::class)->group( function(){
        Route::get('stores', 'index');
        Route::get('store/{id}', 'show');
        Route::post('store', 'store' );
        Route::match(['put', 'patch'], 'store/{id}', 'update');
        Route::delete('store/{id}', 'destroy');
        Route::get('stores/search/{keywords?}', 'search');
    });


    Route::controller(VouchersController::class)->group(function(){
        Route::get('generate_voucher_number', "generate_voucher_number");
        Route::get('vouchers', 'index');
        Route::post('voucher', 'store');
        Route::get('voucher', 'view');
        Route::match(['put', 'patch'], 'voucher/{id}', 'update');
        Route::delete('voucher/{id}', 'destroy');
        Route::get('voucher/scan', 'scanning');
        Route::post('voucher/issuance', 'issuance');
    });

    Route::controller(LocationsController::class)->group(function(){
        Route::get('locations', 'index');
        Route::post('location', 'store');
        Route::match(['put', 'patch'], 'location/{id}', 'update');
        Route::delete('location/{id}', 'destroy');
        Route::get('locations/search/{keywords?}', 'search');
    });

    Route::controller(InventoriesController::class)->group(function(){
        Route::get('inventories', 'index');
        Route::get('inventory', 'show');
        Route::get('all-inventories', 'all');
        Route::post('inventory', 'store');
        Route::match(["put", "patch"], 'inventory/{id}', 'update');
    });

});
