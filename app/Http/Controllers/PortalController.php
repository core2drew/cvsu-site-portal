<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;

class PortalController extends Controller
{
    public function index(Request $request) {
        $isAdmin = Session::get('user')->is_admin;
        return view('index', ["module" => "portal", "isAdmin" => $isAdmin]);
    }
}
