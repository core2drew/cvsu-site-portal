<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use Log;

class AJAXLoginController extends Controller
{
    public function index(Request $request) {
      $username = $request->get('username');
      $password = $request->get('password');
      
      $user = DB::table('users')
        ->select("id", "username", "type", "profile_image_url", "first_name", "last_name")
        ->where('username', '=', $username)
        ->where('password', '=', $password)
        ->where('deleted_at', '=', null)
        ->first();
      if(!empty($user) && $user->id){
        $request->session()->put('user', $user);
        return response()->json($user);
      }
      return response()->json(false);
    }
}
