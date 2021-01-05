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

function getUrlParameter(sParam) {
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

	showUnregistered: function () {
		$('.show-on-load.unregistered-user').show() // show block for unregistered user
	},

	showRegistered: function () {
		$('.show-on-load.registered-user').show() // show block for unregistered user
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
