$(document).on("click", ".settings", function() {

	$('#settings').fadeIn('300');
	$('.settings').fadeOut('300');

});

$(document).on("click", ".close", function() {

	$('#settings').fadeOut('300');
	$('.settings').fadeIn('300');

});

$("#settings input").change(function () {
	if ($(this).is(":checked")) {
		$("#" + $(this).attr("name")).fadeIn();
	} else {
		$("#" + $(this).attr("name")).fadeOut();
	}					 
});


$(document).on("click", "#settings li", function() {

	var theme = $(this).html();
	var color = $('select').find(":selected").text();
	
	$('#flavor').remove();
	
	if(theme == 'misc') {
		var color = 'wood';
	}
	
	$('#flavor').remove();
	$('body').append('<style id="flavor">body {background: #bc1c2b url("assets/img/bg/' + theme + '/' + color + '.png")}</style>');

});


/* Twitter Plugin
================================================== */

$(function($){
	$(".tweet").tweet({
		username: "danielhellier",
		join_text: "auto",
		count: 1,
		loading_text: "loading tweets...",
		template: "{text}{time}"
	});
});


/* Progress Plugin
================================================== */

$(function() {
	$('#progressbar').each(function(){
		var t = $(this),
			dataperc = t.attr('data-perc'),
			barperc = Math.round(dataperc);
		t.find('.bar').animate({width:barperc+'%'}, dataperc*50);
		t.find('.label').append('<div class="perc"></div>');
		
		var current = 0;
		var rate = 1;

		var counter = setInterval(function(){
			if(current >= dataperc) clearInterval(counter);

			$(".perc").text(current +'%');

			current = parseInt(current) + parseInt(rate);

		}, dataperc*25 / (dataperc / rate));		
		
		function perc() {
			var length   = t.find('.bar').css('width'),
			    labelpos = (parseInt(length));
			t.find('.label').css('left', labelpos);
		}
		perc();
		setInterval(perc, 0);
	});
});


/* Countdown Widget
================================================== */

$(function() {
	launchTime = new Date(2014,07,19,21,30); // Set launch: [year], [month], [day], [hour]...
		launchTime.setDate(launchTime.getDate() - 31); // Add 13 days
	$("#countdown").countdown({until: launchTime, format: "odHMS"});
});


/* Subscribe Widget
================================================== */

$("#subscribe button").click(function() {

	var email	= $("#email").val();
	var emailReg = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,3})?(\.[a-zA-Z]{2,3})?$/;
	
	// client-side validation
	 if(emailReg.test(email) == false ){
		emailError = "Sorry, email appears to be invalid";
		return false;
	}

	$.ajax({
		type: "post",
		dataType: "json",
		url: "save-email.php",
		data: $("form#subscribe").serialize(),
		success: function(data) {
			
			$('#subscribe').html('We will notify you upon release. Thank you.');

		}
	});
	return false;
});
