function transformPointsName(value){
	var value = value % 100; // it is same over 100
	if(value == 1) return 'point'; // 1, 101, ...
	else return 'points'; // *5-*0
}

function transformChallengeName(value){
  var value = value % 100; // it is same over 100
	if(value == 1) return 'challenge'; // 1, 101, ...
	else return 'challenges'; // *5-*0
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1)
  var sURLVariables = sPageURL.split('&')

  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}

var challengerEncryptedData = getUrlParameter("data")
var challengerServer = "https://" + getUrlParameter("host")

var widget = {
	slidesCount: $(".slide").length, // Count sliding panes
	currentSlide: 0,
	user: {},

	init: function () {
		// Try to authenticate user first
		$.get(challengerServer + "/api/widget/authenticateUser?data=" + encodeURIComponent(challengerEncryptedData), (data) => {
			if(data.status == "error"){
				widget.showUnregistered()
				return;
			}

			widget.user = data.user

			$(".user-name").text(widget.user.user_name)
			$("#intro-block").show() // Open first slide

			widget.showRegistered()
		}).fail(function( jqXHR, textStatus, errorThrown ) {
			if(jqXHR.status == 401){ // User is now authorized, so we assume he is not registered
				widget.showUnregistered()
			}
		})
	},

	loadData: function(){
		// Load user points
		$.get(challengerServer + "/api/widget/getUserPoints", (data) => {
			$('.show-on-load.unregistered-user').hide(); // User can just get registered so let's hide this block

			$("#points-block").html('You have <span class="points">' + data + '</span> ' + transformPointsName(data) + '!')
		})

		// If user is registered, let's load some more data
		// Load data
		$.get(challengerServer + "/api/widget/getUserNotCollectedPoints", (data) => {
			if(data){
				$("#not-collected-points-block").addClass('slide').html('Collect <span class="points">' + data + '</span> more ' + transformPointsName(data) + '!');
			}else{
				$("#not-collected-points-block").removeClass('slide');
			}

			widget.slidesCount = $('.slide').length;
		})

		// Load data
		$.get(challengerServer + "/api/widget/getUserChallengesQuantity", (data) => {
			if(data > 0){
				$("#available-challenges-block").addClass('slide').html('You have <span class="points">' + data + '</span> ' + transformChallengeName(data))
			}else{
				$("#available-challenges-block").removeClass('slide')
			}

			widget.slidesCount = $('.slide').length
		})
	},

	showUnregistered: function () {
		$('.show-on-load.unregistered-user').fadeIn() // show block for unregistered user
	},

	showRegistered: function () {
		$('.show-on-load.registered-user').fadeIn() // show block for unregistered user
	},
}

$(document).ready(function(){
	widget.init()

	$('#buttonShowPrizes').click(function (event) {
		 event.stopPropagation();
		 window.open(challengerServer + '/login-user-by-external-id?data=' + encodeURIComponent(challengerEncryptedData) + '&redirect_path=prizes', 'challenger')
	})

	$('body').click(function () {
	  window.open(challengerServer + '/login-user-by-external-id?data=' + encodeURIComponent(challengerEncryptedData), 'challenger')
	})
})
