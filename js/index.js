var paper = $('#paper');
paper.attr('width', $(window).width());
paper.attr('height', $(window).height());

var ctx = paper.get(0).getContext('2d');

var drawCircle = function(pos) {
	
	var color = $('div.ball').css('background-color');
	
	ctx.fillStyle = color;
		
	ctx.beginPath();
	ctx.arc(pos.left,pos.top, $('div.ball').width()/2 , 0 , 2*Math.PI );
	ctx.closePath();
	ctx.fill();
	
}

$(document).ready( function(){
	
	var fps = 120;
	
	gyro.frequency = Math.round(1000 / fps);
	
	gyro.startTracking(function(o) {
		
		//$('textarea').html( JSON.stringify(o) );
		
		var speed = 0.2;
		
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
		
		topY = Math.max( $('div.ball').height()/2, topY);
		topY = Math.min( $(window).height() - $('div.ball').height()/2 , topY);
		
		var pos = {
			'left' : topX,
			'top' : topY
		};
		
		drawCircle(pos);
		
		//$('div.ball').stop().animate(pos, 500 , 'linear');
		$('div.ball').css(pos);
		
		pos['axisX'] = axisXDirection;
		pos['axisY'] = axisYDirection;
		
		pos['beta'] = o.beta;
		pos['gamma'] = o.gamma;
		
		pos['currentX'] = currentX;
		pos['currentY'] = currentY;
		
		pos['progressX'] = progressX;
		pos['progressY'] = progressY;
		
	});
	
	$('body').on('touchstart', function(){
		
		var r = Math.round(Math.random() * 255 );
		var g = Math.round(Math.random() * 255 );
		var b = Math.round(Math.random() * 255 );
		
		$('div.ball').css('background-color', 'rgb(' + r + ',' + g + ','+ b  +')');
	});
	
	
	
	
	
	
	
	
	
});