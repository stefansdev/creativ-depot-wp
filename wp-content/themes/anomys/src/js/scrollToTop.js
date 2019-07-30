$(".back_to_top").click(function () {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	console.log('top');
	return false;
});

$(window).scroll(function() {
	var scrollPosition = $("body, html").scrollTop()
	if (scrollPosition > 100) {
		$('.back_to_top').addClass('is_active');
	} else {
		$('.back_to_top').removeClass('is_active');
	}
})