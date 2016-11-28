var artistTitle = ['David Bowie', 'Bob Dylan', 'Donald Fagen', 'Mick Jagger', 'Bob Marley', 'Paul McCartney', 'Elvis Presley'];
var currentGif; var pausedGif; var animatedGif; var stillGif;
var theme = new Audio("assets6/sounds6/rockandroll.m4a");

// BUTTONS //

function createButtons(){
	$('#artistBtn').empty();
	for(var i = 0; i < artistTitle.length; i++){
		var artistBtn = $('<button>').text(artistTitle[i]).addClass('artistBtn').attr({'data-name': artistTitle[i]});
		$('#artistBtn').append(artistBtn);
		var theme = new Audio("assets6/sounds6/rockandroll.m4a");
		theme.play();
	}
}	

// GIFS //

	$(document).on('click', '.artistBtn', function(){
		$('.display').empty();
		
		var thisArtist = $(this).data('name');
										
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=music" + thisArtist + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;

				// Ratings //

				if(thisRating == ''){
				thisRating = 'unrated';
				}

				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				
							// movingGif = $('<img>').attr('src', animatedGif);

				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});	 
	});    	
 

// PAUSE GIF //

$(document).on('mouseover','.playOnHover', function(){
	   	$(this).attr('src', $(this).data('animated'));                 
}); 
$(document).on('mouseleave','.playOnHover', function(){
	   	$(this).attr('src', $(this).data('paused'));                   
}); 

// INPUT //

$('#addArtist').on('click', function(e){
	e.preventDefault();
	var newArtistInput = $('#newArtistInput').val().trim();
	artistTitle.push(newArtistInput);
	$('#newArtistInput').val(" ");
	console.log(artistTitle);
	createButtons();
	
});

createButtons();