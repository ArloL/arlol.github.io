var base03 = '#002b36';
var base02 = '#073642';
var base01 = '#586e75';
var base00 = '#657b83';
var base0 = '#839496';
var base1 = '#93a1a1';
var base2 = '#eee8d5';
var base3 = '#fdf6e3';
var yellow = '#b58900';
var orange = '#cb4b16';
var red = '#dc322f';
var magenta = '#d33682';
var violet = '#6c71c4';
var blue = '#268bd2';
var cyan = '#2aa198';
var green = '#859900';

var raphael = Raphael('raphael');

var start = Math.round(new Date().getTime()/1000-15);

var frowns = [];
var smiles = [];

var frownline = raphael.path('M0,100').attr({stroke: red});
var smileline = raphael.path('M0,100').attr({stroke: blue});

var baseURL = 'http://search.twitter.com/search.json';
var query = '?lang=en&';
query += 'rpp=100&';
query += 'q=:(%20OR%20:)';

function update() {
	jQuery.getJSON(
		baseURL + query + '&callback=?',
		function(data) {
			console.log(data);
			for (var i = data.results.length - 1; i >= 0; i--) {
				var tweet = data.results[i];
				var time = Math.round(new Date(tweet.created_at).getTime()/1000);
				var diff = time-start;
				if (typeof frowns[diff] === "undefined") {
					frowns[diff] = 0;
				}
				if (typeof smiles[diff] === "undefined") {
					smiles[diff] = 0;
				}
				if (tweet.text.indexOf(':(') > -1) {
					frowns[diff]++;
				}
				if (tweet.text.indexOf(':)') > -1) {
					smiles[diff]++;
				}
			};
			for (var i = frowns.length - 1; i >= 0; i--) {
				if(typeof frowns[i] === "undefined") {
					frowns[i] = 0;
				}
			};
			for (var i = smiles.length - 1; i >= 0; i--) {
				if(typeof smiles[i] === "undefined") {
					smiles[i] = 0;
				}
			};

			var smilepath = 'M0,100';
			var frownpath = 'M0,100';

			for (var i = 0; i < frowns.length; i++) {
				frownpath += 'L' + i * 5 + ',' + (100 - 3 * frowns[i]);
			};
			for (var i = 0; i < smiles.length; i++) {
				smilepath += 'L' + i * 5 + ',' + (100 - 3 * smiles[i]);
			};

			frownline.animate({path: frownpath}, 2000);
			smileline.animate({path: smilepath}, 2000);
			
			query = data.refresh_url;

			console.log(frowns, smiles);
			
			setTimeout(update, 2000);
		}
	);
}

update();
