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
      $loginFormUsername = $request->get('username');
      $loginFormPassword = $request->get('password');

      $response = DB::table('users')
                  ->select('id', 'password')
                  ->where('username', '=', $loginFormUsername)
                  ->first();

      if($response && $loginFormUsername) {
        $password = Crypt::decrypt($response->password);
      
        if($loginFormPassword === $password) {
          $user = DB::table('users')
          ->whereNull('users.deleted_at')
          ->select("id", "username", "student_no", "type", "profile_image", "first_name", "last_name", 'is_admin')
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
