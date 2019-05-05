<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;

class LoginController extends Controller
{
    public function index(Request $request) {

      if(Session::get('user')) {
        return redirect('/portal');
      }
      return view("login", ["module" => "login"]);
    }

    public function logout(Request $request) {
      Session::flush();
      return redirect("/");
    }
}
