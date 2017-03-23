$(document).ready( function(){
	
	gyro.frequency = 100;
	
	gyro.startTracking(function(o) {
		
		//$('textarea').html( JSON.stringify(o) );
		
		var speed = 15;
		
		var axisXDirection = o.gamma >= 0 ? 1 : -1;
		var axisYDirection = o.beta >= 0 ? -1 : 1;
		
		var currentX = parseInt($('div.ball').css('left'));
		var currentY = parseInt($('div.ball').css('top'));
		
		var progressX = (axisYDirection * Math.abs(o.beta) * speed );
		var progressY = (axisXDirection * Math.abs(o.gamma) * speed );
		
		var topX = currentX + progressX;
		var topY = currentY + progressY;
		
		topX = Math.max( $('div.ball').width()/2 , topX);
		topX = Math.min( $(window).width() - $('div.ball').width()/2 , topX);
		
		topY = Math.max(0, topY);
		topY = Math.min( $(window).height() , topY);
		
		var pos = {
			'left' : topX,
			'top' : topY
		};
		
		$('div.ball').stop().animate(pos, 500 , 'linear');
		
		pos['axisX'] = axisXDirection;
		pos['axisY'] = axisYDirection;
		
		pos['beta'] = o.beta;
		pos['gamma'] = o.gamma;
		
		pos['currentX'] = currentX;
		pos['currentY'] = currentY;
		
		pos['progressX'] = progressX;
		pos['progressY'] = progressY;
		
		$('textarea').html( JSON.stringify(pos) );
		
	});
});