# Image generator from SVG source for Titanium SDK

## Quick Start

### Get it
[![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/com.falkolab.svgproduct)


Download the latest distribution ZIP-file and consult the
[Titanium Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module) on how install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install com.falkolab.svgproduct`

## Usage

This module provide functionality for convert SVG to image based on configuration.
Also support result caching.

Also you must install `com.geraudbourdin.svgview`.


### Practice example

First create config file in `appc/lib/svgProductConfig.js`:

    module.exports = {
	    // place here your configurations
        'guestMenuHearts':	{
            image : "/images/hearts_blue.svg",
            width : 280,
            height : 280,
            top : 0,
            left : 0
	    }
    };

For more complex example see `example.js`


Add foloving code to `app/alloy.js`:

    var svgProductConfig = require('svgProductConfig');
    Alloy.Globals.SVGProducts = require('SVGProduct').getProducts(svgProductConfig, true /*forceCache*/);

Second argument makes caching imideately. Leave it blank or set to `false` if you need caching in place when it needed.

Now you can use it in `index.tss` for example:

    "Window": {
	    backgroundRepeat: true,
	    backgroundImage : Alloy.Globals.SVGProducts.guestMenuHearts
    }

Give me a star if the widget was useful for you.
