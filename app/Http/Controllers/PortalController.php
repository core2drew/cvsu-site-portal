<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortalController extends Controller
{
    public function index(Request $request) {
        $isAdmin = $request->session()->get('user')->is_admin;
        return view('index', ["module" => "portal", "isAdmin" => $isAdmin]);
    }
}
