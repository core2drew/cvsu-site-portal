<?php

namespace App\Http\Middleware;

use Closure;
use Log;
class CheckIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->session()->get('user')->is_admin) {
            return $next($request);
        }
        return abort(403);
    }
}
