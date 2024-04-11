<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user=$request->user();
    $roles=array();
    $permissions=array();

    $allPermissions=$user->allPermissions();
    if(count($allPermissions)){
        foreach($allPermissions as $permission){
            array_push($permissions,$permission->name);
        }
    }

    
    ($user->hasRole('admin')) ? array_push($roles, 'admin') : '';
    ($user->hasRole('tutor')) ? array_push($roles, 'tutor') : '';

    return array(
        'user'=>$user,
        'permissions'=>$permissions,
        'roles'=>$roles
    );
});

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout']);
Route::get('/blog',[BlogController::class, 'index']);
Route::get('/blog/{blogID}',[BlogController::class, 'blogPost']);
Route::post('/item/create',[ItemController::class, 'create'])->middleware('auth');
Route::get('/item/fetch',[ItemController::class,'fetch']);
Route::get('/item/{itemID}',[ItemController::class,'show']);

