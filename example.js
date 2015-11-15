// complex config example

function buildCircleInXML() {
	var doc = getBlankSVGDoc();
	var svg = doc.getElementsByTagName('svg').item(0);
	svg.setAttribute('width', 100);
	svg.setAttribute('height', 100);
	var circle = doc.createElement('circle');
	circle.setAttribute('cx', 50);
	circle.setAttribute('cy', 50);
	circle.setAttribute('r', 50);
	circle.setAttribute('fill', '#ff0000');
	svg.appendChild(circle);
	return Ti.XML.serializeToString(doc);
}

function buildCircleIn_x2js(opts) {
	var X2JS = require('com.falkolab.x2js').X2JS;
	//var r = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+
	return new X2JS({useDoubleQuotes: true}).json2xml_str({
		"svg": {
			"_width": 100,
			"_height": 100,
			"circle": {
				"_id": "circle",
				"_cx": 50,
				"_cy": 50,
				"_r": 50,
				"_fill": "#247177"
			}
		}
	});
}

function loadFromFileAndChangeColor() {
    var svgProduct = require('com.falkolab.svgproduct');
    // helper for get xml doc from file
    var doc = svgProduct.loadDocFromFile('anyfile.svg');
    // find element with id="abc"
	doc.getElementById('abc').setAttribute('fill', '#ff0000');
	return Titanium.XML.serializeToString(doc);
}

var svgProduct = require('com.falkolab.svgproduct');


exports.config = {
    // generate SVG and cache it to the file (config value as function)
	'circle_38x38' : svgProduct.cachedDynamicSVGAdapter(buildCircleIn_x2js,
        // this options uset as arguments
        // in com.geraudbourdin.svgview and buildCircleIn_x2js
        {
    		width : 38,
    		height : 38
    	}),
    // load from file and change color
    'fromFile_red': {
        image: loadFromFileAndChangeColor(),
        width : 50,
        height : 50
    }
};
