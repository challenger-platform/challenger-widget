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

var widget = {
	slidesCount: 0,
	currentSlide: 0,
	user: {},

	init: function () {
		// Count sliding panes
		widget.slidesCount = $('.slide').length

		// Try to authenticate user first
		$.get(challengerServer + "/api/widget/authenticateUser?data=" + encodeURIComponent(encrypted_data), (data) => {
			if(data.status == 'error'){
				widget.showUnregistered()
				return;
			}

			widget.user = data.user

			widget.loadData()
			$('.slide:eq(0)').show() // Open first slide

		}).fail(function( jqXHR, textStatus, errorThrown ) {
			if(jqXHR.status == 401){ // User is now authorized, so we assume he is not registered
				widget.showUnregistered()
			}
		})
	},

	loadData: function(){
		// Load data
		$.get(challengerServer + "/api/widget/getUserPoints", (data) => {
			$('.show-on-load.unregistered-user').hide(); // User can just get registered so let's hide this block

			$("#points-block").html('You have <span class="points">' + data + '</span> ' + transformPointsName(data) + '!');
			$("#points").text(data);
			$('.show-on-load.registered-user').fadeIn(); // Let widget show slides when this block is loaded

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
					$("#available-challenges-block").addClass('slide').html('You have <span class="points">' + data + '</span> ' + transformChallengeName(data));
				}else{
					$("#available-challenges-block").removeClass('slide');
				}

				widget.slidesCount = $('.slide').length;
			})
		})
	},

	showUnregistered: function () {
		$('.show-on-load.unregistered-user').fadeIn() // show block for unregistered user
	},
}

$(document).ready(function(){
	widget.init()
})

$('#widgetApp').click(function () {
  window.open(challengerServer + '/login-user-by-external-id?encrypted_data=' + encrypted_data, 'challenger')
})
