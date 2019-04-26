@if($module === 'portal')
<script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
@endif

<script src="{{ mix('js/'.$module.'.js') }}" defer></script>