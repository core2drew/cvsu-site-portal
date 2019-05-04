<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Cavite State University - Cavite City</title>
        @include("templates.styles")
    </head>
    <body>
        @if($module === 'portal' && !$isAdmin)
            <div id="App" class="-student"></div>
        @else
            <div id="App"></div>
        @endif

    </body>
    @include("templates.scripts")
</html>
