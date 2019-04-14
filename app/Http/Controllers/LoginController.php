<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(Request $request) {

      if($request->session()->get('user')) {
        return redirect('/portal');
      }
      return view("login", ["module" => "login"]);
    }

    public function logout(Request $request) {
      $request->session()->flush();
      return redirect("/");
    }
}
