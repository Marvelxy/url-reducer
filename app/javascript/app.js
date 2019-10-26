$(document).ready(function(){
	$('#reduce_url_link').on('click', function(){
		$('html, body').animate({ scrollTop: $('#container_fluid').offset().top }, '2000');
	});

	$('#how_it_works_link').on('click', function(){
		$('html, body').animate({ scrollTop: $('#how_it_works').offset().top }, '2000');
	});
});
