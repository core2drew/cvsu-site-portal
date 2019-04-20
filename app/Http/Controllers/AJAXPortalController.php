<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class AJAXPortalController extends Controller
{
    public function getPortalUser(Request $request) {
        return response()->json($request->session()->get('user'));
    }
}
