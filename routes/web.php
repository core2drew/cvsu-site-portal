<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{route?}', [
    "as" => "site",
    "uses" => "SiteController@index"
])->where('route', '(about|admission|facilities|contact)');

Route::group([
    "as" => "portal",
    "prefix" => "portal",
    "middleware" => "check.session"
], function() {
    Route::get("/{route?}", [
        "uses" => "PortalController@index",
    ])->where('route', '(dean-message|announcements|academic-calendar|students|users)');;
});

Route::group([
    "as" => "auth", 
    "prefix" => "auth"
], function() {
    Route::get("/login", [
        "as" => "login", 
        "uses" => "LoginController@index"
    ]);
    Route::get("/logout", [
        "as" => "logut", 
        "uses" => "LoginController@logout"
    ]);
});


Route::group([
    "as" => "ajax",
    "prefix" => "ajax"
], function() {
    Route::post("/login", [
        "as" => "ajax.login",
        "uses" => "AJAXLoginController@index"
    ]);
});