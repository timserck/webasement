$(document).ready(function() {
function openfeed(){
	if($('.row_2').hasClass('hide')){
		$('.row_2').removeClass('hide');
		$('.row_1').addClass('hide');
	}
}


$('.valid_code').click(openfeed);

$.getJSON("https://congress.api.sunlightfoundation.com/hearings?dc=true&apikey=c663d5bbeb5f4cf4b7297637bcc1c0f9", function(response) {
	console.log(response.results);
	  $(response.results).each(function() {
		$('section.feed > ul')
			.append($('<div>')
				.addClass('warpper')
				.append($('<li>')
		  			.addClass('case_li'+' '+this.hearing_type)
		  			.append($("<p>", { text : this.occurs_at.replace('T', ' ').replace(/-/g,'/').replace('Z', ' ') })
		  				.addClass('date')
		  				)
		  			.append($('<p>', { text : this.description })
		  				.addClass('description')
		  				)
		  			.append($("<a>", { href : this.url , text : 'url'  })
		  				.addClass('link')
		  				)
		  			)
		  	)
		  	
	  });
	  $('section.feed > ul > .warpper > li').hammer();
  });
});

var video = document.getElementById("myVideo");
video.play();

setTimeout(function(){
	$('video').animate({'opacity': '0'},2000).addClass('hide');
	if($('.row_1').hasClass('hide')){ $('.row_1').removeClass('hide'); }
}, 0);
//display none the video 0
// hammer part
$('ul.list').hammer().data("hammer").get("swipe").set({ direction: Hammer.DIRECTION_ALL });
				
var options = {
	pointers : 1, 
	threshold : 2, 
	velocity : 0.4 
}


$('section.feed').on("swipeleft", ".case_li",function(e){
	$('.warpper').css('background', 'red');
	$(this).stop().velocity({ "left": "-100%", 'height': '2px' }, 1000, function(){
		$(this).addClass('hide');
	});
});
$('section.feed').on("swiperight", ".case_li",function(e){
	$('.warpper').css('background', 'green');
	$(this).stop().velocity({ "left": "100%", 'height': '2px' }, 1000, function(){
		$(this).addClass('hide');
	});
});
$('ul.list').hammer(options).on("swipedown", function(e){
	$('.spinner').velocity({ "z-index": "1", "opacity": "1" });
	$(this).stop().velocity({ "margin-top": "30%" }, 800, function(){
		$(this).velocity({ "margin-top": "0" });
		$('.spinner').velocity({ "z-index": "-1", "opacity": "0" });
	});
});