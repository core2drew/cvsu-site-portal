<!-- Fonts -->
<link href="{{ asset('fonts/rubik/style.css') }}" rel="stylesheet">
<link href="{{ asset('fonts/cvsu-font-icon/style.css') }}" rel="stylesheet">

@if($module === 'site')
<link href="{{ asset('vendors/owl-carousel/assets/owl.theme.default.min.css') }}" rel="stylesheet"/>
<link href="{{ asset('vendors/owl-carousel/assets/owl.carousel.min.css') }}" rel="stylesheet"/>
@endif

<!-- Style -->
<link href="{{ mix('css/app.css') }}" rel="stylesheet">
<link href="{{ mix('css/'.$module.'.css') }}" rel="stylesheet">
