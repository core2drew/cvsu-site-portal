<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Session;
use Log;
use Crypt;
use Mail;

class AJAXPortalController extends Controller
{
    public function getPortalUser(Request $request) {
        return response()->json(Session::get('user'));
    }

    function updateUserSession($id) {
        $response = DB::table('users')
        ->select("id", "profile_image", "first_name", "last_name", "email", "type", "is_admin")
        ->where('id', '=', $id)
        ->first();

        Session::put('user', $response);

        return response()->json(true);
    }

    public function updatePortalUser(Request $request) {
        $id = $request->get('id');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');
        $email = $request->get('email');

        $firstName = !empty($firstName) ? $firstName : Session::get('user')->first_name;
        $lastName = !empty($lastName) ? $lastName : Session::get('user')->last_name;
        $email =  !empty($email) ? $email : Session::get('user')->email;

        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
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

    public function getAnnouncements(Request $request) {
        $limit = $request->get('limit') ? $request->get('limit') : 15;
        $response = DB::table('announcements')
        ->whereNull('announcements.deleted_at')
        ->latest()
        ->paginate($limit);
        return response()->json($response);
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
            ->orderBy('from', 'asc')
            ->get();
        } else {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
        }

        return response()->json($response);
    }

    public function getRequirements(Request $request) {
        $response = DB::table('requirements_content')->latest()->first();
        return response()->json($response);
    }

    public function getRetentionPolicies(Request $request) {
        $response = DB::table('retention_policies_content')->latest()->first();
        return response()->json($response);
    }

    public function getCourseOffered(Request $request) {
        $response = DB::table('course_offered_content')->latest()->first();
        return response()->json($response);
    }

    public function studentSignup(Request $request) {
        $studentNo = $request->get('studentNo');
        $email = $request->get('email');
        $password = $request->get('password');
        $firstName = null;
        $lastName = null;
        $isUserEmailExist = $this->checkUserEmail($email);
        $isStudentExist = $this->checkStudentNo($studentNo);
        $isVerifiedStudentNo = $this->verifyStudentNo($studentNo);

        if(!$isVerifiedStudentNo) {
            return  response()->json([
                'status' => 400,
                'message' => 'Student number does not exists. Please change it and try again.'
            ]);
        }

        if($isStudentExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Student number already registered.'
            ]);
        }

        if($isUserEmailExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Email already exists. Please change it and try again.'
            ]);
        }

        $firstName = $isVerifiedStudentNo->FirstName;
        $lastName = $isVerifiedStudentNo->LastName;
        $created_at = now();
        $updated_at = now();

        $response = DB::table('users')
        ->insert([
            'student_no' => $studentNo,
            'email' => $email,
            'password' => Crypt::encrypt($password),
            'first_name' => $firstName,
            'is_await' => 1,
            'type' => 'student',
            'last_name' => $lastName,
            'created_at' => $created_at,
            'updated_at' => $updated_at
        ]);

        if($response) {
            // $user = DB::table('users')
            // ->where('email', '=', $email)
            // ->whereNull('users.deleted_at')
            // ->first();

            // $userDetails['id'] = $user->id;
            // $token = Crypt::encrypt($userDetails);
            // $this->sendConfirmation($email, $studentNo, $token);

            return response()->json([
                'status' => 200,
                'message' => 'You have been successfully registered!'
            ]);
        }

        return abort(500);
    }

    public function studentSignUpRequest(Request $request) {
        $studentNo = $request->get('studentNo');
        $email = $request->get('email');
        $firstName = $request->get('firstName');
        $lastName = $request->get('lastName');

        $isUserEmailExist = $this->checkUserEmail($email);
        $isStudentExist = $this->checkStudentNo($studentNo);
        $isVerifiedStudentNo = $this->verifyStudentNo($studentNo);

        if(!$isVerifiedStudentNo) {
            return  response()->json([
                'status' => 400,
                'message' => 'Student number does not exists. Please change it and try again.'
            ]);
        }

        if($isStudentExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Student number already registered.'
            ]);
        }

        if($isUserEmailExist) {
            return response()->json([
                'status' => 400,
                'message' => 'Email already exists. Please change it and try again.'
            ]);
        }

        $created_at = now();
        $updated_at = now();

        $response = DB::table('users')
        ->insert([
            'student_no' => $studentNo,
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'is_await' => 1,
            'type' => 'student',
            'created_at' => $created_at,
            'updated_at' => $updated_at
        ]);

        if($response) {
            $user = DB::table('users')
            ->where('email', '=', $email)
            ->whereNull('users.deleted_at')
            ->first();

            $userDetails['id'] = $user->id;
            $token = Crypt::encrypt($userDetails);
            $this->sendConfirmation($email, $studentNo, $token);

            return response()->json([
                'status' => 200,
                'message' => 'You will receive an email after admin verified your request. Thank you'
            ]);
        }

        return abort(500);
    }

    public function getStudentInfo(Request $request) {
        $studentNo = Session::get('user')->student_no;
        $firstName = Session::get('user')->first_name;
        $lastName = Session::get('user')->last_name;
        $schoolYears = $this->getSchoolYears($studentNo);
        $semesters = $this->getSemesters($studentNo);
        $grades = $this->getStudentGrades($studentNo, $schoolYears, $semesters);

        return response()->json([
            'studentNo' => $studentNo,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'schoolYears' => $schoolYears,
            'semesters' => $semesters,
            'grades' => $grades
        ]);
    }

    private function getSchoolYears($studentNo) {
        $response = [];
        $schoolYears = DB::table('grades')
            ->select('Schoolyear')
            ->where('StudentNumber', '=', $studentNo)
            ->groupBy('Schoolyear')
            ->orderBy('Schoolyear', 'asc')
            ->get();

        foreach($schoolYears as $schoolYear) {
            $response[] = $schoolYear->Schoolyear;
        }

        return $response;
    }

    private function getStudentGrades($studentNo, $schoolYears, $semesters) {
        $response = [];
        foreach($schoolYears as $schoolYear) {
            foreach($semesters as $semester) {
                // Get Grades on each School year and on each semester
                $grade = DB::table('grades')
                    ->select('CourseCode', "CreditUnits", "Grade", "remarks")
                    ->where('StudentNumber', '=', $studentNo)
                    ->where('Schoolyear', $schoolYear)
                    ->where('Semester', $semester)
                    ->get();
                // Return semesters that only have grades
                if(count($grade)) {
                    $response["$schoolYear"]["$semester"] = $grade;
                }
            }
        }
        return $response;
    }

    private function getSemesters($studentNo) {
        $response = [];
        $semesters = DB::table('grades')
                ->select('Semester')
                ->where('StudentNumber', '=', $studentNo)
                ->groupBy('Semester')
                ->get();
        foreach($semesters as $semester) {
            $response[] = $semester->Semester;
        }
        return $response;
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

    private function checkUserEmail($email) {
        $response = DB::table('users')
                ->whereNull('users.deleted_at')
                ->where('email', '=', $email)
                ->first();
        return $response;
    }

    public function verifyToken(Request $request) {
        try {
            $token = $request->get('token');
            $data = Crypt::decrypt($token);
            $studentNo = $data['studentNo'];
            $userId = $data['id'];
            $response = DB::table('users')
            ->where('student_no', '=', $studentNo)
            ->where('id', '=', $userId)
            ->where('is_await', '=', 1)
            ->whereNull('users.deleted_at')
            ->first();
            if($response) {
                return response()->json($data);
            }
            return abort(403);
        } catch(DecryptException $e) {
            abort(403);
        }
    }

    public function activateAccount(Request $request) {
        $id = $request->get('id');
        $password = $request->get('password');
        $updated_at = now();

        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update([
            'is_await' => 0,
            'password' => Crypt::encrypt($password),
            'updated_at' => $updated_at
        ]);

        if($response) {
            return response()->json([
                'status' => 200
            ]);
        }
        return abort(500);
    }

    public function confirmAccount(Request $request) {
        $id = $request->get('id');
        $response = DB::table('users')
        ->where('id', '=', $id)
        ->update([
            'is_await' => 0,
            'updated_at' =>  now()
        ]);
        if($response) {
            return response()->json([
                'status' => 200
            ]);
        }
        return abort(500);
    }

    private function sendConfirmation($email, $fullName, $token) {
        $fullName = strtolower($fullName);
        $fullName = ucwords($fullName);
        $link = config('app.url').'/confirm-account?token='.$token;
        return Mail::send('email-template.confirmation', compact('fullName', 'link') , function ($msg) use($email) {
            $msg->subject('CvSU-CC Portal Confirmation');
            $msg->from('info@cvsu-cc.com', 'CvSU-CC Info Portal (Do not reply)');
            $msg->to($email);
        });
    }

    public function getFacilities() {
        $response = DB::table('facilities')->select()->get();
        if($response) {
            return response()->json($response);
        }
        return abort(500);
    }
}
