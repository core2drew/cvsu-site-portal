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
      
      $user = DB::table('users')->where('username', '=', $username)->where('password', '=', $password)->first();
      if(!empty($user) && $user->id){
        $request->session()->put('user', $user);
        return response()->json($user);
      }
      return response()->json(false);
    }
}
