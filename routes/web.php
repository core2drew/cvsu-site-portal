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

    // Portal
    Route::group([
        "as" => "ajax.portal",
        "prefix" => "portal",
    ], function() {
        Route::get("/user", [
            "as" => "ajax.portal.user",
            "uses" => "AJAXPortalController@getPortalUser",
            "middleware" => "check.session"
        ]);

        // Dean Message
        Route::get("/dean-message", [
            "as" => "ajax.portal.dean-message",
            "uses" => "AJAXPortalController@getDeanMessage"
        ]);
        Route::post("/dean-message", [
            "as" => "ajax.portal.add.dean-message",
            "uses" => "AJAXPortalController@addDeanMessage",
            "middleware" => "check.session"
        ]);
    });
});