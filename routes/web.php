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
])->where('route', '(about|admission|facilities|contact-us)');

Route::group([
    "as" => "portal",
    "prefix" => "portal",
    "middleware" => "check.session"
], function() {
    Route::get("/{route?}", [
        "uses" => "PortalController@index",
    ])->where('route', '(dean-message|announcements|academic-calendar|requirements|retention-policies|course-offered|students)');
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

        // User
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
            "uses" => "AJAXAdminPortalController@addDeanMessage",
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
            "uses" => "AJAXAdminPortalController@addAnnouncements",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::patch("/announcements", [
            "as" => "ajax.portal.update.announcements",
            "uses" => "AJAXAdminPortalController@updateAnnouncement",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete("/announcements", [
            "as" => "ajax.portal.delete.announcements",
            "uses" => "AJAXAdminPortalController@deleteAnnouncement",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Academic Calendar
        Route::get("/academic-calendar", [
            "as" => "ajax.portal.academic-calendar",
            "uses" => "AJAXPortalController@getAcademicCalendar"
        ]);

        Route::post("/academic-calendar", [
            "as" => "ajax.portal.add.academic-calendar",
            "uses" => "AJAXAdminPortalController@addAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::patch("/academic-calendar", [
            "as" => "ajax.portal.update.academic-calendar",
            "uses" => "AJAXAdminPortalController@updateAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete("/academic-calendar", [
            "as" => "ajax.portal.delete.academic-calendar",
            "uses" => "AJAXAdminPortalController@deleteAcademicCalendar",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Requirements
        Route::get("/requirements", [
            "as" => "ajax.portal.requirements",
            "uses" => "AJAXPortalController@getRequirements"
        ]);

        Route::post("/requirements", [
            "as" => "ajax.portal.add.requirements",
            "uses" => "AJAXAdminPortalController@addRequirements",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Retention Policies
         Route::get("/retention-policies", [
            "as" => "ajax.portal.retention-policies",
            "uses" => "AJAXPortalController@getRetentionPolicies"
        ]);

        Route::post("/retention-policies", [
            "as" => "ajax.portal.add.retention-policies",
            "uses" => "AJAXAdminPortalController@addRetentionPolicies",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

         // Course Offered
         Route::get("/course-offered", [
            "as" => "ajax.portal.course-offered",
            "uses" => "AJAXPortalController@getCourseOffered"
        ]);

        Route::post("/course-offered", [
            "as" => "ajax.portal.add.course-offered",
            "uses" => "AJAXAdminPortalController@addCourseOffered",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Users Table
        Route::get("/users", [
            "as" => "ajax.portal.users",
            "uses" => "AJAXAdminPortalController@getUsers",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::post("/users", [
            "as" => "ajax.portal.add.users",
            "uses" => "AJAXAdminPortalController@addUser",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete("/users", [
            "as" => "ajax.portal.delete.users",
            "uses" => "AJAXAdminPortalController@deleteUser",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Students Table
        Route::get("/students", [
            "as" => "ajax.portal.students",
            "uses" => "AJAXAdminPortalController@getStudents",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        Route::delete('/students', [
            "as" => "ajax.portal.delete.students",
            "uses" => "AJAXAdminPortalController@deleteStudent",
            "middleware" => ["check.session", "check.isadmin"]
        ]);

        // Student Sign Up
        Route::post('/signup', [
            "as" => "ajax.portal.student.signup",
            "uses" => "AJAXPortalController@studentSignup",
        ]);

        // Student Info
        Route::get('/student', [
            "as" => "ajax.portal.student",
            "uses" => "AJAXPortalController@getStudentInfo",
            "middleware" => ["check.session"]
        ]);
    });
});
