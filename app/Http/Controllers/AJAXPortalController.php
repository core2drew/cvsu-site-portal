<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Session;
use Log;
use Crypt;

class AJAXPortalController extends Controller
{
    public function getPortalUser(Request $request) {
        return response()->json($request->session()->get('user'));
    }

    function updateUserSession($id) {
        $response = DB::table('users')
        ->select("id", "profile_image", "first_name", "last_name", "username", "type", "password")
        ->where('id', '=', $id)
        ->first();
        Session::put('user', $response);

        return response()->json(true);
    }

    public function updatePortalUser(Request $request) {
        $id = $request->get('id');
        $username = $request->get('username');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');

        $username = !empty($username) ? $username : Session::get('user')->username;
        $firstName = !empty($firstName) ? $firstName : Session::get('user')->first_name;
        $lastName = !empty($lastName) ? $lastName : Session::get('user')->last_name;

        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update([
            'first_name' => $firstName, 
            'last_name' => $lastName, 
            'username' => $username,
            'updated_at' => now()
        ]);

        if($response) {
            return response()->json($this->updateUserSession($id));
        }

        return abort(500);
    }

    public function updatePortalUserPassword(Request $request) {
        $id = $request->get('id');
        $sessionPassword = Session::get('user')->password;
        $currentPassword = $request->get('currentPassword');
        $newPassword = $request->get('newPassword');

        if($currentPassword === $sessionPassword) {
            $response = DB::table('users')
            ->where('id', '=', $id)
            ->update([
                'password' => $newPassword,
                'updated_at' => now()
            ]);

            if($response) {
                return response()->json($this->updateUserSession($id));
            }
            return abort(500);
        }

        return response()->json([
            'message' => 'Incorrect Current password'
        ]);
    }

    public function updatePortalUserProfileImage(Request $request) {
        $id = $request->get('id');
        $image = $request->file('image');
        $imageExt = $image->getClientOriginalExtension();
        $profileImage =  now()->timestamp.".$imageExt";
        $path = Storage::disk('public')->putFileAs("profile-images", $image, $profileImage);
 
        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update([
            "profile_image" => $path,
            'updated_at' => now()
        ]);

        if($response) {
            return response()->json($this->updateUserSession($id));
        }

        return abort(500);
    }

    public function getDeanMessage(Request $request) {
        $response = DB::table('dean_message')->latest()->first();
        return response()->json($response);
    }

    public function addDeanMessage(Request $request) {
        $response = DB::table('dean_message')
        ->insert(['message' => $request->get('message'), 'created_at' => now()]);
        return response()->json($response);
    }

    public function getAnnouncements(Request $request) {
        $response = DB::table('announcements')
        ->whereNull('announcements.deleted_at')
        ->latest()
        ->paginate(15);
        return response()->json($response);
    }

    public function getAnnouncementByLimit(Request $request) {
        $response = DB::table('announcements')
        ->whereNull('announcements.deleted_at')
        ->latest()
        ->simplePaginate(5);
        return response()->json($response);
    }

    public function addAnnouncements(Request $request) {
        $title = $request->get('title');
        $content = $request->get('content');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('announcements')
        ->insert([
            'title' => $title, 
            'content' => $content, 
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function updateAnnouncement(Request $request) {
        $id = $request->get('id');
        $title = $request->get('title');
        $content = $request->get('content');

        $response = DB::table('announcements')
        ->where('id', '=', $id)
        ->update([
            'title' => $title, 
            'content' => $content, 
            'updated_at' => now()
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function deleteAnnouncement(Request $request) {
        $id = $request->get('id');
        $response = DB::table('announcements')
        ->where('id', '=', $id)
        ->update(['deleted_at' => now()]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function getAcademicCalendar(Request $request) {
        $isFromHomePage = $request->get('isFromHomePage');
        $response = null;

        if($isFromHomePage) {
            $currentMonth = $request->get('currentMonth');
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->whereMonth ('from', '=', $currentMonth)
            ->orderBy('to', 'asc')
            ->get();
        } else {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
        }

        return response()->json($response);
    }

    public function addAcademicCalendar(Request $request) {
        $activity = $request->get('activity');
        $from = $request->get('from');
        $to = $request->get('to');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('academic_calendar')
        ->insert([
            'activity' => $activity, 
            'from' => $from,
            'to' => $to, 
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    } 

    public function updateAcademicCalendar(Request $request) {
        $id = $request->get('id');
        $activity = $request->get('activity');
        $from = $request->get('from');
        $to = $request->get('to');
        $updated_at = now();

        $response = DB::table('academic_calendar')
        ->where('id', '=', $id)
        ->update([
            'activity' => $activity, 
            'from' => $from, 
            'to' => $to, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function deleteAcademicCalendar(Request $request) {
        $id = $request->get('id');
        $response = DB::table('academic_calendar')
        ->where('id', '=', $id)
        ->update(['deleted_at' => now()]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }
}
