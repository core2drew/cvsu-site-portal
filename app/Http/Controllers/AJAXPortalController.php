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
        ->select("id", "profile_image", "first_name", "last_name", "username", "type")
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
        $response = DB::table('users')->select('password')->where('id', '=', $id)->first();
        $oldPassword = Crypt::decrypt($response->password);

        $currentPassword = $request->get('currentPassword');
        $newPassword = $request->get('newPassword');

        if($currentPassword === $oldPassword) {
            $response = DB::table('users')
            ->where('id', '=', $id)
            ->update([
                'password' => Crypt::encrypt($newPassword),
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
            $currentYear = $request->get('currentYear');
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->whereMonth ('from', '=', $currentMonth)
            ->whereYear ('from', '=', $currentYear)
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

    public function getRequirements(Request $request) {
        $response = DB::table('requirements_content')->latest()->first();
        return response()->json($response);
    }

    public function addRequirements(Request $request) {
        $response = DB::table('requirements_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }

    public function getRetentionPolicies(Request $request) {
        $response = DB::table('retention_policies_content')->latest()->first();
        return response()->json($response);
    }

    public function addRetentionPolicies(Request $request) {
        $response = DB::table('retention_policies_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }
    
    public function getCourseOffered(Request $request) {
        $response = DB::table('course_offered_content')->latest()->first();
        return response()->json($response);
    }

    public function addCourseOffered(Request $request) {
        $response = DB::table('course_offered_content')
        ->insert(['content' => $request->get('content'), 'created_at' => now()]);
        return response()->json($response);
    }

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

    public function studentSignup(Request $request) {
        $studentNo = $request->get('studentNo');
        $username = $request->get('username');
        $password = $request->get('password');
        $firstName = null;
        $lastName = null;
        $isUsernameExist = $this->checkUsername($username);
        $isStudentNoExist = $this->checkStudentNo($studentNo);
        $isVerifiedStudentNo = $this->verifyStudentNo($studentNo);

        if(!$isVerifiedStudentNo) {
            return  response()->json([
                'status' => 400,
                'message' => 'Student number does not exists. Please change it and try again.'
            ]);
        }

        if($isStudentNoExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Student number already registered.'
            ]);
        }

        if($isUsernameExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Username already exists. Please change it and try again.'
            ]);
        }

        $firstName = $isVerifiedStudentNo->FirstName;
        $lastName = $isVerifiedStudentNo->LastName;
        $created_at = now();
        $updated_at = now();
        
        $response = DB::table('users')
        ->insert([
            'student_no' => $studentNo,
            'username' => $username,
            'password' => Crypt::encrypt($password),
            'first_name' => $firstName, 
            'last_name' => $lastName,
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);
        
        if($response) {
            return response()->json([
                'status' => 200,
                'message' => 'You have been successfully registered!'
            ]);
        }

        return abort(500);
    }

    private function checkUsername($username) {
        $response = DB::table('users')
                    ->whereNull('users.deleted_at')
                    ->where('username', '=', $username)
                    ->first();
        return $response;
    }

    private function checkStudentNo($studentNo) {
        $response = DB::table('users')
                    ->whereNull('users.deleted_at')
                    ->where('student_no', '=', $studentNo)
                    ->first();
        return $response;
    }

    private function verifyStudentNo($studentNo) {
        $response = DB::table('studentinfo')
                    ->where('StudentNumber', '=', $studentNo)
                    ->first();
        return $response;
    }
}
