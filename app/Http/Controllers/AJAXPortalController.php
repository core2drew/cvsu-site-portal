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
        ->latest()
        ->paginate(15);
        return response()->json($response);
    }

    public function getAnnouncementByLimit(Request $request) {
        $response = DB::table('announcements')
        ->whereNull('announcements.deleted_at')
        ->latest()
        ->simplePaginate(5);
        return response()->json($response);
    }

    public function addAnnouncements(Request $request) {
        $title = $request->get('title');
        $content = $request->get('content');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('announcements')
        ->insert([
            'title' => $title, 
            'content' => $content, 
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function updateAnnouncement(Request $request) {
        $id = $request->get('id');
        $title = $request->get('title');
        $content = $request->get('content');

        $response = DB::table('announcements')
        ->where('id', '=', $id)
        ->update([
            'title' => $title, 
            'content' => $content, 
            'updated_at' => now()
        ]);

        if($response) {
            $response = DB::table('announcements')
            ->whereNull('announcements.deleted_at')
            ->latest()
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
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function getAcademicCalendar(Request $request) {
        $isFromHomePage = $request->get('isFromHomePage');
        $response = null;

        if($isFromHomePage) {
            $currentMonth = $request->get('currentMonth');
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->whereMonth ('from', '=', $currentMonth)
            ->orderBy('to', 'asc')
            ->get();
        } else {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
        }

        return response()->json($response);
    }

    public function addAcademicCalendar(Request $request) {
        $activity = $request->get('activity');
        $from = $request->get('from');
        $to = $request->get('to');
        $created_at = now();
        $updated_at = now();

        $response = DB::table('academic_calendar')
        ->insert([
            'activity' => $activity, 
            'from' => $from,
            'to' => $to, 
            'created_at' => $created_at, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    } 

    public function updateAcademicCalendar(Request $request) {
        $id = $request->get('id');
        $activity = $request->get('activity');
        $from = $request->get('from');
        $to = $request->get('to');
        $updated_at = now();

        $response = DB::table('academic_calendar')
        ->where('id', '=', $id)
        ->update([
            'activity' => $activity, 
            'from' => $from, 
            'to' => $to, 
            'updated_at' => $updated_at
        ]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }

    public function deleteAcademicCalendar(Request $request) {
        $id = $request->get('id');
        $response = DB::table('academic_calendar')
        ->where('id', '=', $id)
        ->update(['deleted_at' => now()]);

        if($response) {
            $response = DB::table('academic_calendar')
            ->whereNull('academic_calendar.deleted_at')
            ->latest()
            ->paginate(15);
            return response()->json($response);
        }

        return abort(500);
    }
}
