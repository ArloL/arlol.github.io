var counter = 0;

function randX() {
	return Math.random() * (jQuery('body').width() - 100);
}

function randY() {
	return Math.random() * (jQuery('body').height() - 100);
}

function shake() {
	jQuery(this).css({left: randX(), top: randY()});
}

function addBox(x, y) {
	counter++;
	jQuery('<div id="d' + counter + '"></div>').appendTo('.article');
	jQuery('#d' + counter).css({left: x, top: y});
	jQuery('#d' + counter).mouseenter(shake);
}

jQuery(document).click(function(event) {
	addBox(event.pageX, event.pageY);
});

jQuery('#add-100').click(function(event) {
	for (var i = 0; i < 100; i++) {
		addBox(randX(), randY());
	}
});
