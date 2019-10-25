$(document).ready(function(){
	// Add Cross Site Request Token to all ajax headers. Rails require this.
	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		}
	});


	var bookmarks = [];

	// Get logged in user's bookmarks
	$.ajax({
		type: "GET",
		global: false,
					url: "bookmarks",
					dataType: "json",
					success: function(data){
						bookmarks = data;
					}
	});

	// Return a bookmark using title of the bookmark
	function return_single_bookmark(title){
		for (var i = bookmarks.length - 1; i >= 0; i--) {
			if(bookmarks[i].title === title){
				return {
					bookmark_id: bookmarks[i].id,
					title: bookmarks[i].title,
					geolocation: bookmarks[i].geolocation,
					note: bookmarks[i].note
				};
			}
		}
	}

	// Return stars
	function return_stars(stars) {
		var returned_stars = '';

		switch(parseInt(stars)){
			case 5:
				for(var i = 0; i < parseInt(stars); i++){
					returned_stars += '<i class="fas fa-star gold-star"></i>';
				}
				break;
			case 4:
				for(var i = 0; i < parseInt(stars); i++){
					returned_stars += '<i class="fas fa-star gold-star"></i>';
				}
				returned_stars += '<i class="far fa-star gold-star"></i>';
				break;
			case 3:
				for(var i = 0; i < parseInt(stars); i++){
					returned_stars += '<i class="fas fa-star gold-star"></i>';
				}
				returned_stars += '<i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i>';
				break;
			case 2:
				for(var i = 0; i < parseInt(stars); i++){
					returned_stars += '<i class="fas fa-star gold-star"></i>';
				}
				returned_stars += '<i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i>';
				break;
			case 1:
				for(var i = 0; i < parseInt(stars); i++){
					returned_stars += '<i class="fas fa-star gold-star"></i>';
				}
				returned_stars += '<i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i><i class="far fa-star gold-star"></i>';
				break;
			default:
				for(var i = 0; i <= 4; i++){
					returned_stars += '<i class="far fa-star gold-star"></i>';
				}
		}

		return returned_stars;
	}

	function getLocation() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	  } else {
			$('#map').html('<h5 class="mt-5">Geolocation is not supported by this browser.</h5>');
	    //x.innerHTML = "Geolocation is not supported by this browser.";
	  }
	}

	function showPosition(position) {
	  /*x.innerHTML = "Latitude: " + position.coords.latitude +
	  "<br>Longitude: " + position.coords.longitude;*/

		// Initialize the platform object:
		var platform = new H.service.Platform({
		'apikey': '6OtoknayctHqyYvpXZKMdwjlgg6IkcNCXIwHkOmmfbk'
		});


		// Obtain the default map types from the platform object
		var maptypes = platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		var map = new H.Map(document.getElementById('map'), maptypes.vector.normal.map,{
			zoom: 10,
			center: { lng: position.coords.longitude, lat: position.coords.latitude }
		});

		//var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
		var mapEvents = new H.mapevents.MapEvents(map);

		// Create the default UI:
		var ui = H.ui.UI.createDefault(map, maptypes);

		// Create a marker icon from an image URL:
		var icon = new H.map.Icon('http://maps.google.com/mapfiles/ms/micons/green-dot.png');

		var current_location = new H.map.Marker({lat: position.coords.latitude, lng: position.coords.longitude}, { icon: icon});

		map.addObject(current_location);
		addInfoBubble(map, ui, position.coords.latitude, position.coords.longitude, 'null', current_location);

		// check if logged in then load saved locations if any.
		$.ajax({
			type: "GET",
			url: "check-auth",
			//dataType: "json",
			beforeSend: function(){},
			success: function(data){
				if(data == "true"){
					console.log(data);
					$.ajax({
						type: "GET",
						url: "bookmarks",
						dataType: "json",
						//beforeSend: function(){},
						success: function(data){
							console.log(data);
							if(data.length >= 1){
								for(var i = 0; i < data.length; i++){
									var cords = data[i]['geolocation'].split(',');
									var coordinates = {lat: parseFloat(cords[0]), lng: parseFloat(cords[1])};

									var contentString = '<div id="content">'+
									'<h6 id="firstHeading" class="firstHeading">'+data[i]['title']+'</h6>'+
									'<div id="bodyContent">'+
									'<p>'+data[i]['note']+'</p>'+
									'<p>'+return_stars(data[i]['review_stars'])+'</p>'+
									'<a href="#" id="editBookmark" bookmark_id="'+data[i]['id']+'" title="'+data[i]['title']+'"  category_id="'+data[i]['category_id']+'" location="'+data[i]['geolocation']+'" note="'+data[i]['note']+'">EDIT</a>'+
									'</div>'+
									'</div>';

									// Create a marker icon from an image URL:
									var icon = new H.map.Icon(data[i]['marker_icon']);

									var saved_location = new H.map.Marker(coordinates, { icon: icon },{
										// mark the object as volatile for the smooth dragging
    								volatility: true
									});

									// Ensure that the marker can receive drag events
  								//saved_location.draggable = true;

									map.addObject(saved_location);
									addInfoBubble(map, ui, parseFloat(cords[0]), parseFloat(cords[1]), contentString, saved_location);



									// disable the default draggability of the underlying map
								  // and calculate the offset between mouse and target's position
								  // when starting to drag a marker object:
								  /*map.addEventListener('dragstart', function(ev) {
								    var target = ev.target,
								        pointer = ev.currentPointer;
								    if (target instanceof H.map.Marker) {
								      var targetPosition = map.geoToScreen(target.getGeometry());
								      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
								      behavior.disable();
								    }
								  }, false);


								  // re-enable the default draggability of the underlying map
								  // when dragging has completed
								  map.addEventListener('dragend', function(ev) {
										console.log(ev.target.b);
								    var target = ev.target;
								    if (target instanceof H.map.Marker) {
								      behavior.enable();
								    }


										var option = confirm('Do you want to edit this bookmark?');

										if(option){
											var data = return_single_bookmark($(this).attr('title'));

											var lat = this.getPosition().lat();
											var lng = this.getPosition().lng();
											var geolocation = lat + ',' + lng;

											$('#editBookmarkId').val(data.bookmark_id);
											$('#editTitle').val(data.title);
											$('#editGeolocation').val(geolocation);
											$('#editNote').val(data.note);
											$('#editBookmarModal').modal('show');
										}
										else{
											marker.setPosition(iPos);
										}


								  }, false);

								  // Listen to the drag event and move the position of the marker
								  // as necessary
								   map.addEventListener('drag', function(ev) {
								    var target = ev.target,
								        pointer = ev.currentPointer;
								    if (target instanceof H.map.Marker) {
								      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
								    }
								  }, false);*/

								}
							}
						}
					});
				}
			}
		});


		// Add event listener:
		map.addEventListener('tap', function(evt) {
			// Log 'tap' and 'mouse' events:
			console.log(evt.type, evt);

			var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
			//map.setCenter(coord);
    	//logEvent('Clicked at ' + Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S') + ' ' + Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W'));
			//console.log(coord);
			$.ajax({
				type: "GET",
				url: "check-auth",
				dataType: "json",
				beforeSend: function(){},
				success: function(data){}
			}).done(function(data){
				//Check if user is logged in
				if(data){
					//	Do these if logged in
						var latitude = coord.lat;
						var longitude = coord.lng;
						new_current = {lat: latitude, lng: longitude};

						$('#geolocation').val(latitude + ',' + longitude);

						$('#saveBookmarModal').modal('show');
				}
				else{
					//	Do these if not logged in
						$('#productInfoModal').modal('show');
				}
			});
		});

		//Bookmark select navigator for logged in users
		$('#bookmarkSearch').on('mouseup', function(){
			var cords = $(this).val().split(',');
			map.setCenter({ lng: parseFloat(cords[1]), lat: parseFloat(cords[0]) });
			add_temporary_circle_to_map(map, parseFloat(cords[0]), parseFloat(cords[1]));
		});


		// Add behaviors to map
		var behavior = new H.mapevents.Behavior(mapEvents);


		$('#mapSearch').on('change', function(){
			var searchText = $('#searchText');
			var slectedOption = $(this).val();
			if(slectedOption === 'addressSearch'){
				searchText.val('');
				searchText.attr('placeholder','19, Example address, ...');
			}
			else if (slectedOption === 'locationSearch') {
				searchText.val('');
				searchText.attr('placeholder','Latitude, Longitude');
			}
			else {
				searchText.attr('placeholder','--SELECT SEARCH TYPE--');
			}
		});

		$('#searchButton').on('click', function(){
			var what_to_search = $('#mapSearch').val();
			var search_text = $('#searchText');
			if(what_to_search === 'addressSearch'){
				console.log(search_text.val());
				// Create the parameters for the geocoding request:
					var geocodingParams = {
				    //searchText: '200 S Mathilda Ave, Sunnyvale, CA'
						searchText: search_text.val()
				  };

				// Define a callback function to process the geocoding response:
				var onResult = function(result) {
					console.log(result);
				  var locations = result.Response.View[0].Result,
				    position,
				    marker;
				  // Add a marker for each location found
				  for (i = 0;  i < locations.length; i++) {
				  position = {
				    lat: locations[i].Location.DisplayPosition.Latitude,
				    lng: locations[i].Location.DisplayPosition.Longitude
				  };
					map.setCenter(position);
				  marker = new H.map.Marker(position);
				  map.addObject(marker);
				  }
				};

				// Get an instance of the geocoding service:
				var geocoder = platform.getGeocodingService();

				// Call the geocode method with the geocoding parameters,
				// the callback and an error callback function (called if a
				// communication error occurs):
				geocoder.geocode(geocodingParams, onResult, function(e) {
				  alert(e);
				});
			}
			else if (what_to_search === 'locationSearch') {
				//console.log(search_text.val());
				var cords = search_text.val().split(',');
				var lat = parseFloat(cords[0]);
				var lng = parseFloat(cords[1]);

				/* Max and min coordinates for google map
				*  Latitude: -90.0 to +90.0 (actually -85.05115 for some reason)
				*  Longitude: -180.0 to +180.0
				*/
				if(lat && lng){
					if(((lat >= -90.0) && (lat <= 90.0)) && ((lng >= -180.0) && (lng <= 180.0))) {
						map.setCenter({ lng: parseFloat(cords[1]), lat: parseFloat(cords[0]) });
						map.setZoom(10);
						add_temporary_circle_to_map(map, parseFloat(cords[0]), parseFloat(cords[1]));
					}
					else if(lat < -90.0){
						alert('Latitude too low');
					}
					else if(lat > 90.0){
						alert('Latitude too high');
					}
					else if(lng < -180.0){
						alert('Longitude too low');
					}
					else if(lng > 180.0){
						alert('Longitude too high');
					}
					/*else{
						map.setCenter({ lng: parseFloat(cords[1]), lat: parseFloat(cords[0]) });
					}*/
				}
				else{
					alert('You must enter longitude and latitude.');
				}
			}
			else {
				alert('Fill in all fields and try again');
			}

			return false;
		});

		// Add click event listener to EDIT button on the infowindow
		$('#edit-bookmark-progress-bar-wrapper').hide();
    $('#bookmark-edited').hide();
    $('#bookmark-edit-error').hide();
    $('body').on('click', '#editBookmark', function() {
    	$('#editBookmarkId').val($(this).attr('bookmark_id'));
    	$('#editTitle').val($(this).attr('title'));
    	$('#editGeolocation').val($(this).attr('location'));
    	$('#editNote').val($(this).attr('note'));
			$('#editBookmarModal').modal('show');

    	return false;
    });

		// Edit bookmark
		$('#editBookmarkButton').on('click', function(){
    	$('#bookmark-edit-error').hide();

    	var bookmark_id = $('#editBookmarkId').val();
    	var title = $('#editTitle').val();
    	var category_id = $('#editCategoryId').val();
    	var geolocation = $('#editGeolocation').val();
    	var note = $('#editNote').val();

    	console.log(bookmark_id);

    	if(title && category_id && geolocation && note){
	    	$.ajax({
					type: "PATCH",
					url: "bookmarks/" + bookmark_id,
					dataType:"json",
					data: {bookmark_id: bookmark_id, title: title, category_id: category_id, geolocation: geolocation, note: note},
					beforeSend: function(){
						$('#edit-bookmark-progress-bar-wrapper').show();
					},
					success: function(data, textStatus, jqXHR){
						console.log(data);
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.log(errorThrown);
					}
				}).done(function(data){
		    	if(data){
		    		$('#edit-bookmark-progress-bar-wrapper').hide();
		    		$('#bookmark-edited').fadeIn();
		    		window.location.reload();
					}
		    });
			}
			else{
				$('#bookmark-edit-error').fadeIn();
			}
    });

    // Clear Edit bookmark modal when modal is hidden
    $('#editBookmarModal').on('hidden.bs.modal', function (e) {
	  	$('#bookmark-edit-error').hide();
	  	$('#bookmark-edited').hide();
		});

		// Save bookmark
    $('#save-bookmark-progress-bar-wrapper').hide();
    $('#bookmark-saved').hide();
    $('#bookmark-error').hide();
		$('#saveBookmarkButton').on('click', function(){
    	$('#bookmark-error').hide();

    	$title = $('#title').val();
    	$category_id = $('#bookmark_category_id').val();
    	$geolocation = $('#geolocation').val();
    	$note = $('#note').val()

    	if($title && $category_id && $geolocation && $note){
		    	$.ajax({
					type: "POST",
					url: "bookmarks",
					//dataType:"json",
					data: {title: $('#title').val(), category_id: $('#bookmark_category_id').val(), geolocation: $('#geolocation').val(), note: $('#note').val()},
					beforeSend: function(){
						$('#save-bookmark-progress-bar-wrapper').show();
					},
					success: function(data, textStatus, jqXHR){
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.log(errorThrown);
					}
				}).done(function(data){
			    if(data){
		    		$('#save-bookmark-progress-bar-wrapper').hide();
		    		$('#bookmark-saved').fadeIn();
		    		window.location.reload();
					}
			  });
			}
			else{
				$('#bookmark-error').fadeIn();
			}

			return false;
    });


    // Hide element when 'save bookmark' modal closes
    $('#saveBookmarModal').on('hidden.bs.modal', function (e) {
	  	$('#bookmark-error').hide();
		});


		function getCurrentPosition(position){
			map.setCenter({ lng: position.coords.longitude, lat: position.coords.latitude });
			add_temporary_circle_to_map(map, position.coords.latitude, position.coords.longitude);
		}


		// Locate me button
		$('#locateMe').on('click', function(){
		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(getCurrentPosition);
		  } else {
		    x.innerHTML = "Geolocation is not supported by this browser.";
		  }
		});

	}



	getLocation();


	// Reuseable functions

	// Add Info bubble to markers.
	function addInfoBubble(map, ui, lat, lng, content, marker) {
	  var group = new H.map.Group();

	  map.addObject(group);

	  // add 'tap' event listener, that opens info bubble, to the group
	  group.addEventListener('tap', function (evt) {
	    // event target is the marker itself, group is a parent event target
	    // for all objects that it contains
	    var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
	      // read custom data
	      content: evt.target.getData()
	    });

	    // show info bubble
	    ui.addBubble(bubble);

			// This prevent event other click event from triggerting.
			evt.stopPropagation();
	  }, false);

		//var marker = new H.map.Marker({lat: lat, lng: lng});
	  // add custom data to the marker
		if (content === 'null'){
	  	marker.setData('<p>This is your current location</p>');
		}
		else{
			marker.setData(content);
		}
	  group.addObject(marker);
	  //addMarkerToGroup(group, {lat: lat, lng: lng}, '<p>This is your current location</p>');
	}

	// Add temporary circle to map
	function add_temporary_circle_to_map(map, lat, lng){
		var customStyle = {
			strokeColor: 'black',
			fillColor: 'rgba(0, 255, 25, 1)',
			//radius: 2000
			/*lineWidth: 10,
			lineCap: 'square',
			lineJoin: 'bevel'*/
		};

		// Instantiate a circle object (using the default style):
		var circle = new H.map.Circle({lat: lat, lng: lng}, 2000, {style: customStyle});

		//var rect = new H.map.Rect(new H.geo.Rect(53.5, 12.5, 51.5, 14.5), { style: customStyle });
		// Add the circle to the map
		map.addObject(circle);


		setTimeout(function(){
			//var circle = new H.map.Circle({lat: parseFloat(cords[0]), lng: parseFloat(cords[1])}, 0);
			map.removeObject(circle);
		}, 3000);
	}





});
