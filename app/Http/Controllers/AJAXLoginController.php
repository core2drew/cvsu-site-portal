<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Crypt;
use Log;
use Session;

class AJAXLoginController extends Controller
{
    public function index(Request $request) {
      $user = null;
      $formEmail = $request->get('email');
      $formPassword = $request->get('password');

      $response = DB::table('users')
                  ->whereNull('users.deleted_at')
                  ->whereRaw("BINARY email = '$formEmail'")
                  ->first();

      if($response && $formEmail) {
        $password = Crypt::decrypt($response->password);
        if($formPassword === $password) {
          $user = DB::table('users')
          ->whereNull('users.deleted_at')
          ->where('is_await', "!=", 1)
          ->select("id", "email", "student_no", "type", "profile_image", "first_name", "last_name", 'is_admin')
          ->where('id', '=', $response->id)
          ->first();
        }

        if(!empty($user) && $user->id){
          Session::put('user', $user);
          return response()->json([
            'id' => $user->id
          ]);
        }
      }
      abort(403);
    }
}
