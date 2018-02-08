window.onload = function() {
    var submit = document.getElementById("submit");
	
	//performs function when user clicks submit button
    submit.addEventListener("click", function() {
		//resets .results class
		document.querySelector(".results").innerHTML = "";
		var movie = $("#movie").val();
  
		var settings = {
			async: true,
			crossDomain: true,
			url:
				"https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" +
			movie +
				"&language=en-US&api_key=d95e0715a998b10f00c3768041d74ac0",
			method: "GET",
			headers: {},
			data: "{}"
		};
  
		$.ajax(settings).done(function(response) {          
			for (var i = 0; i < response.results.length; i++) {
				var searchResults = document.querySelector(".results");
				
				//gets posters based on search results array and displays them, uses default image if no poster image is found
				if (response.results[i].poster_path === null){              
					$(".results").append("<img src='https://s3.us-east-2.amazonaws.com/dougjthayer.com/image/noposter.png' class='poster' id='" + i + "' title='" + response.results[i].title + "'></img>");
				} else {
					$(".results").append("<img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + response.results[i].poster_path + "' class='poster' id='" + i + "' title='" + response.results[i].title + "'></img>");              
				}           
			}
          
			var modal = document.querySelector(".modal");
			var open_modal = document.querySelector(".results")
			var close_modal = document.querySelector(".modal-close");
			var page = document.querySelector(".container");

			//opens modal when poster is clicked
			open_modal.onclick = function(){
				//resets modal content
				document.querySelector(".modal-body").innerHTML = "";
				//turns modal visibility on
				modal.style.display = "block";      
				
				//gets id of clicked poster
				var result_id = $(event.target);      
				
				//displays poster if image found, default if not
				if(response.results[result_id[0].id].poster_path === null){
					$(".modal-body").append("<img class='modal-poster' src='https://s3.us-east-2.amazonaws.com/dougjthayer.com/image/noposter.png'></img>");
				} else {
					$(".modal-body").append("<img class='modal-poster' src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + response.results[result_id[0].id].poster_path + "'></img>");                 
				}
				
				//appends movie information to modal
				$(".modal-body").append("<p class='modal-text'>Title: " + response.results[result_id[0].id].title + "</p>");
				$(".modal-body").append("<p class='modal-text'>Overview: " + response.results[result_id[0].id].overview + "</p>");
				$(".modal-body").append("<p class='modal-text'>Release Date: " + response.results[result_id[0].id].release_date + "</p>");
			}	    
			
			//closes modal when X is clicked
			close_modal.onclick = function(){
				modal.style.display = "none";              
			}

			//closes modal when user clicks outside modal
			window.onclick = function(event){
				if(event.target == modal){
					modal.style.display = "none";         
				}	
			}          
		});
	}, false);
};
  

  
  