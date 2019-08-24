@if($module === 'portal' && $isAdmin)
<script defer src="https://cdn.ckeditor.com/4.11.4/full/ckeditor.js"></script>
@endif

@if($module === 'site')
<script src="https://code.jquery.com/jquery-3.4.0.min.js" integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
<script src="{{ asset('vendors/owl-carousel/owl.carousel.min.js') }}" defer></script>
<script src="{{ asset('js/facilities-slider.js') }}" defer></script>
@endif

<script src="{{ mix('js/'.$module.'.js') }}" defer></script>
