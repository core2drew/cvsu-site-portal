<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index(Request $request) {
      return view("login", ["module" => "login"]);
    }

    public function logout(Request $request) {
      return redirect("/");
    }
}
