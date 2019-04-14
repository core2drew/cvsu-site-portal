<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Cavite State University - Cavite City</title>
        @include("styles")
        <link href="{{ asset('css/site.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="App"></div>
    </body>
    @include("scripts")
</html>
