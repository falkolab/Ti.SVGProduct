function getImageFileFromSVG(svgOpts, name) {
	if(_.isFunction(svgOpts)) {
		svgOpts = svgOpts(name);
	}
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory,
		Ti.Utils.md5HexDigest(JSON.stringify(svgOpts)));

	if (!file.exists()) {
		var SVG = require('com.geraudbourdin.svgview');
		if (!file.write(SVG.createView(svgOpts).toImage())) {
			Ti.API.error("Can't save to file. Product:", name);
			return null;
		} else {
			Ti.API.debug('SVG product cached:', name);
		}
	} else {
		Ti.API.debug('SVG product is already cached:', name);
	}

	return file.exists() ? file.getNativePath(): null;
}

exports.getProducts = function(config, forceCache) {
	var product = {};
	_.each(config, function(opts, key) {
		Object.defineProperty(product, key, {
			get: _.partial(getImageFileFromSVG, opts, key)
		});
		forceCache && product[key];
	});
	return product;
};

exports.loadDocFromFile = function(localPathToSVG) {
	var svgFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, localPathToSVG);
	return Ti.XML.parseString(svgFile.read().text);
};

exports.cachedDynamicSVGAdapter = function(svgGenerator, opts) {
	var getter = function() {
		var svg = svgGenerator(opts);
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory,
			Ti.Utils.md5HexDigest(svg));

		if (!file.exists()) {
			if (!file.write(svg)) {
				Ti.API.error("Can't save to file.");
				return null;
			}
		}

		return _.extend(opts, {
			image : file.exists() ? file.getNativePath() : null
		});
	};

	return getter;
};
