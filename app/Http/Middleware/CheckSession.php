<?php

namespace App\Http\Middleware;

use Closure;
use Log;

class CheckSession
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
        if(!$request->session()->get('user')) {
            return redirect('/auth/login');
        }
        return $next($request);
    }
}
