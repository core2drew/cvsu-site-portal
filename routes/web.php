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
    ])->where('route', '(dean-message|announcements|academic-calendar|requirements|retention-policies|course-offered|students|users)');
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

        // Users
        Route::get("/user", [
            "as" => "ajax.portal.user",
            "uses" => "AJAXPortalController@getPortalUser",
            "middleware" => "check.session"
        ]);

        Route::patch("/user", [
            "as" => "ajax.portal.update.user",
            "uses" => "AJAXPortalController@updatePortalUser",
            "middleware" => "check.session"
        ]);

        Route::patch("/user/update-password", [
            "as" => "ajax.portal.update.user.password",
            "uses" => "AJAXPortalController@updatePortalUserPassword",
            "middleware" => "check.session"
        ]);

        Route::post('/user/profile-image', [
            "as" => "ajax.portal.update.user.profile-image",
            "uses" => "AJAXPortalController@updatePortalUserProfileImage",
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
            "middleware" => ["check.session", "check.isadmin"]
        ]);
        
        //Announcements
        Route::get("/announcements", [
            "as" => "ajax.portal.announcements",
            "uses" => "AJAXPortalController@getAnnouncements"
        ]);

        Route::get('/limited/announcements', [
            "as" => "ajax.portal.limited.announcements",
            "uses" => "AJAXPortalController@getAnnouncementByLimit"
        ]);

        Route::post("/announcements", [
            "as" => "ajax.portal.add.announcements",
            "uses" => "AJAXPortalController@addAnnouncements",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::patch("/announcements", [
            "as" => "ajax.portal.update.announcements",
            "uses" => "AJAXPortalController@updateAnnouncement",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete("/announcements", [
            "as" => "ajax.portal.delete.announcements",
            "uses" => "AJAXPortalController@deleteAnnouncement",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Academic Calendar
        Route::get("/academic-calendar", [
            "as" => "ajax.portal.academic-calendar",
            "uses" => "AJAXPortalController@getAcademicCalendar"
        ]);

        Route::post("/academic-calendar", [
            "as" => "ajax.portal.add.academic-calendar",
            "uses" => "AJAXPortalController@addAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::patch("/academic-calendar", [
            "as" => "ajax.portal.update.academic-calendar",
            "uses" => "AJAXPortalController@updateAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete("/academic-calendar", [
            "as" => "ajax.portal.delete.academic-calendar",
            "uses" => "AJAXPortalController@deleteAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);
    });
});