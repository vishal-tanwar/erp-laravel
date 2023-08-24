<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="X-CSRF" content="{{ csrf_token() }}"/>
    <title>{{ config("app.name")}} - React</title>

     @vite(['resources/sass/app.scss'])
</head>
<body>

<div id="root"></div>

@vite(['resources/js/app.js'])
</body>
</html>