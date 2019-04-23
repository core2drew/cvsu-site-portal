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
        ->whereNull('announcements.deleted_at')
        ->paginate(15);
        return response()->json($response);
    }

    public function getAnnouncementByLimit(Request $request) {
        $limit = $request->get('limit');
        $response = DB::table('announcements')
        ->whereNull('announcements.deleted_at')
        ->latest()
        ->orderBy('created_at')
        ->limit($limit)
        ->get();
        return response()->json($response);
    }

    public function addAnnouncements(Request $request) {
        $title = $request->get('title');
        $content = $request->get('content');
        $slug = $request->get('slug');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('announcements')
        ->insert([
            'title' => $title, 
            'content' => $content, 
            'slug' => $slug,
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function updateAnnouncement(Request $request) {
        $id = $request->get('id');
        $title = $request->get('title');
        $content = $request->get('content');
        $slug = $request->get('slug');

        $response = DB::table('announcements')
        ->where('id', '=', $id)
        ->update([
            'title' => $title, 
            'content' => $content, 
            'slug' => $slug,
            'updated_at' => now()
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function deleteAnnouncement(Request $request) {
        $id = $request->get('id');
        $response = DB::table('announcements')
        ->where('id', '=', $id)
        ->update(['deleted_at' => now()]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }
}
