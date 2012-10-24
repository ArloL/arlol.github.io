var R = Raphael('clock');

var clockRadius = Math.min(jQuery('#clock').width() / 2, jQuery('#clock').height());

var center = new Object();
center.x = clockRadius;
center.y = clockRadius + 10;

var handleWidth = 0.05 * clockRadius;
var secondsOuterWidth = 0.02 * clockRadius;
var secondsHandleWidth = 0.01 * clockRadius;

var set = R.set();

// clock base
set.push(R.circle(center.x, center.y, clockRadius).attr({
    fill: 'white',
    'stroke-width': 0
}));

var degrees = 0;
for (var i = 0; i < 12; i++) {
	set.push(R.rect(center.x - (handleWidth / 2), center.y - clockRadius + 0.05 * clockRadius, handleWidth, 0.15 * clockRadius).attr({
		fill: 'black',
		transform: 'r' + degrees + ',' + center.x + ',' + center.y
	}));
	degrees += 30;
};

degrees = 0;
for (var i = 0; i < 60; i++) {
	set.push(R.rect(center.x - (secondsOuterWidth / 2), center.y - clockRadius + 0.05 * clockRadius, secondsOuterWidth, 0.05 * clockRadius).attr({
		fill: 'black',
		transform: 'r' + degrees + ',' + center.x + ',' + center.y
	}));
	degrees += 6;
};

var date = new Date();

var initialSeconds = date.getSeconds() / 60 * 360 + date.getMilliseconds() / 60 / 1000 * 360;
var initialMinutes = date.getMinutes() / 60 * 360 + initialSeconds / 60;
var initialHours = date.getHours() / 12 * 360 + initialMinutes / 12;

var hoursRotation = 30 * 360;
var minutesRotation = hoursRotation * 12;
var secondsRotation = minutesRotation * 60;
var milliseconds = secondsRotation / 6 * 1000;

// hours
set.push(R.rect(center.x - (handleWidth / 2), center.y - clockRadius * 0.5, handleWidth, clockRadius * 0.75).attr({
	fill: 'black',
	transform: 'r' + initialHours + ',' + center.x + ',' + center.y
}).animate({
    transform: 'r' + hoursRotation + ',' + center.x + ',' + center.y
}, milliseconds));

// minutes
set.push(R.rect(center.x - (handleWidth / 2), center.y - clockRadius * 0.95, handleWidth, clockRadius * 1.2).attr({
	fill: 'black',
	transform: 'r' + initialMinutes + ',' + center.x + ',' + center.y
}).animate({
    transform: 'r' + minutesRotation + ',' + center.x + ',' + center.y
}, milliseconds));

// seconds
set.push(R.rect(center.x - (secondsHandleWidth / 2), center.y - clockRadius * 0.65, secondsHandleWidth, clockRadius * 0.9).attr({
	fill: 'red',
	'stroke-width': 0,
	transform: 'r' + initialSeconds + ',' + center.x + ',' + center.y
}).animate({
    transform: 'r' + secondsRotation + ',' + center.x + ',' + center.y
}, milliseconds));

set.push(R.circle(center.x, center.y, 0.025 * clockRadius).attr({
	fill: 'red',
	'stroke-width': 0
}));

set.push(R.circle(center.x, center.y - clockRadius * 0.65, clockRadius * 0.075).attr({
	fill: 'red',
	'stroke-width': 0,
	transform: 'r' + initialSeconds + ',' + center.x + ',' + center.y
}).animate({
    transform: 'r' + secondsRotation + ',' + center.x + ',' + center.y
}, milliseconds));
