<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class AJAXPortalController extends Controller
{
    public function getPortalUser(Request $request) {
        return response()->json($request->session()->get('user'));
    }

    public function getDeanMessage(Request $request) {
        $response = DB::table('dean_message')->latest()->first();
        return response()->json($response);
    }

    public function addDeanMessage(Request $request) {
        $response = DB::table('dean_message')
        ->insert(['message' => $request->get('message'), 'created_at' => now()]);
        return response()->json($response);
    }

    public function getAnnouncements(Request $request) {
        $response = DB::table('announcements')
        ->join('users', 'announcements.user_id', '=', 'users.id')
        ->select('users.username', 'announcements.*')
        ->paginate(15);
        return response()->json($response);
    }

    public function addAnnouncements(Request $request) {
        $title = $request->get('title');
        $content = $request->get('content');
        $slug = $request->get('slug');
        $userId = $request->get('userId');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('announcements')
        ->insert([
            'title' => $title, 
            'content' => $content, 
            'slug' => $slug,
            'user_id' => $userId,
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->join('users', 'announcements.user_id', '=', 'users.id')
            ->select('users.username', 'announcements.*')
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }
}
