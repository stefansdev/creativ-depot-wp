$(document).ready(function () {
	$('.menu_toggle').on('click', function() {
		$('.menu').toggleClass('is_active');
		$(this).toggleClass('is_active');
	})
})