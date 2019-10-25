$(document).ready(function(){
	$('.rate-location').on('click', function(){
		var bookmark_id = $(this).attr('bookmark_id');
		$('#bookmark_id').val(bookmark_id);
		$('#rate-and-edit-ratings-modal').modal('show');
	});

	// Rate location
	$('#rate-location').on('click', function(){
		var bookmark_id = $('#bookmark_id').val();
		var review_stars = $('#review_stars').val();

		$.ajax({
			type: "post",
			url: "rate-location/" + bookmark_id,
			data: {bookmark_id: bookmark_id, review_stars: review_stars},
			beforeSend: function(){
				/*$('#edit-bookmark-progress-bar-wrapper').show();
				$('#edit-bookmark-progress-bar').removeClass('w-25');
				$('#edit-bookmark-progress-bar').addClass('w-75');*/
				//console.log('Sending data...');
			},
			success: function(data, textStatus, jqXHR){
				//$('#edit-bookmark-progress-bar').removeClass('w-75');
				//$('#edit-bookmark-progress-bar').addClass('w-100');
				//console.log('Data sent!');
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(errorThrown);
			}
		}).done(function(data){
	    	if(data){
				/*$('#edit-bookmark-progress-bar').removeClass('w-100');
	    		$('#edit-bookmark-progress-bar').addClass('w-25');
	    		$('#edit-bookmark-progress-bar-wrapper').hide();
	    		$('#bookmark-edited').fadeIn();*/
	    		window.location.reload();
	    		//console.log(data);
			}

	    });
	});

	// Show edit bookmark Modal
	// Add click event listener to EDIT button on the infowindow
	$('.editBookmarkButton').on('click', function() {
		$('#editBookmarkId').val($(this).attr('bookmark_id'));
		$('#editTitle').val($(this).attr('title'));
		$('#editGeolocation').val($(this).attr('location'));
		$('#editNote').val($(this).attr('note'));
		$('.editBookmarModal').modal('show');

		return false;
	});

});
