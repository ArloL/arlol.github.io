var R = Raphael('clock');

// clock base
R.circle(300, 300, 200);

var degrees = 0;
for (var i = 0; i < 12; i++) {
	R.rect(295, 110, 10, 30).attr({
		fill: 'black',
		transform: 'r' + degrees + ',300,300'
	});
	degrees += 30;
};

degrees = 0;
for (var i = 0; i < 60; i++) {
	R.rect(298, 110, 4, 10).attr({
		fill: 'black',
		transform: 'r' + degrees + ',300,300'
	});
	degrees += 6;
};

// hours
var hours = R.rect(250, 295, 150, 10).attr({
	fill: 'black'
})

// minutes
var minutes = R.rect(250, 295, 240, 10).attr({
	fill: 'black'
});

// seconds
var seconds = R.rect(250, 299, 180, 2).attr({
	fill: 'red',
	'stroke-width': 0
});

R.circle(300, 300, 5).attr({
	fill: 'red',
	'stroke-width': 0
});

var seconds_circle = R.circle(430, 300, 15).attr({
	fill: 'red',
	'stroke-width': 0
});

function rotate_hours() {
	hours.animate({
		transform: 'r3600,300,300'
	}, 180000);
}

function rotate_minutes() {
	minutes.animate({
		transform: 'r3600,300,300'
	}, 120000);
}

function rotate_seconds() {
	seconds.animate({
		transform: 'r3600,300,300'
	}, 60000);
}

function rotate_seconds_circle() {
	seconds_circle.animate({
		transform: 'r3600,300,300'
	}, 60000);
}

rotate_hours();
rotate_minutes();
rotate_seconds();
rotate_seconds_circle();

