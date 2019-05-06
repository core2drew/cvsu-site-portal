<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AJAXAdminPortalController extends Controller
{
    // Dean Message
    public function addDeanMessage(Request $request) {
        $response = DB::table('dean_message')
        ->insert(['message' => $request->get('message'), 'created_at' => now()]);
        return response()->json($response);
    }

    // Announcements
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

    // Academic Calendar
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

    // Admission Requirements
    public function addRequirements(Request $request) {
        $response = DB::table('requirements_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }

    // Admission Retention Policies
    public function addRetentionPolicies(Request $request) {
        $response = DB::table('retention_policies_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }

    // Admission Couse Offered
    public function addCourseOffered(Request $request) {
        $response = DB::table('course_offered_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }

    // Users
    public function getUsers(Request $request) {
        $response = DB::table('users')
        ->whereNull('users.deleted_at')
        ->latest()
        ->paginate(15);
        return response()->json($response);
    }

    public function addUser(Request $request) {
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $username = $request->get('username');
        $password = $request->get('password');

        $isUsernameExist = $this->checkUsername($username);

        if($isUsernameExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Username already exists. Please change it and try again.'
            ]);
        }

        $response = DB::table('users')
        ->insert([
            'first_name' => $firstName, 
            'last_name' => $lastName,
            'username' => $username, 
            'password' => Crypt::encrypt($password),
            'created_at' => now(), 
            'updated_at' => now()
        ]);

        if($response) {
            $response = DB::table('users')
            ->whereNull('users.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function deleteUser(Request $request) {
        $id = $request->get('id');
        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update(['deleted_at' => now()]);

        if($response) {
            $response = DB::table('users')
            ->whereNull('users.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function getStudents(Request $request) {
        $searchBy = $request->get('searchBy');
        $search = $request->get('search');
        $response = [];

        if($searchBy && $search) {
            $response = DB::table('users')
            ->whereNull('deleted_at')
            ->whereNotNull('student_no')
            ->where('type', '=', 'student')
            ->where("$searchBy", "like", "$search%")
            ->paginate(1);
        } else {
            $response = DB::table('users')
            ->whereNull('deleted_at')
            ->whereNotNull('student_no')
            ->where('type', '=', 'student')
            ->paginate(1);
        }
        return response()->json($response);
    }
}
