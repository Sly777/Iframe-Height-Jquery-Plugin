# Iframe Height Jquery Plugin (Version 1.0.0)

## Usage

----------------------------------

- include the latest version jquery in your page
- include the latest version iframe height plugin
- use .iframeHeight() to iframe that you want to fix

----------------------------------

## Examples

----------------------------------

__Basic Usage__ : ''
$(document).ready(function(){
    $('#autoIframe').iframeHeight();
});
''

or

''
$(document).ready(function(){
    $.iframeHeight('#autoIframe');
});
''

__Debug Mode Usage__ : ''
$('#autoIframe').iframeHeight({
	debugMode : true
});
''

__Full Options Usage__ : ''
$('#autoIframe').iframeHeight({
	resizeMaxTry         : 2,  
	resizeWaitTime       : 300,    
	minimumHeight        : 100, 
	defaultHeight        : 500,   
	heightOffset         : 90,    
	exceptPages          : "",  
	debugMode            : false,
	visibilitybeforeload : true,
	blockCrossDomain     : true
});
''

----------------------------------

## Options

----------------------------------

- __resizeMaxTry__ : how many try that find true values (default : 4 Times)
- __resizeWaitTime__ : wait time before next try (default : 50ms)
- __minimumHeight__ : minimum height for iframe (default : 200px)
- __defaultHeight__ : default height for iframe (default: 1000px)
- __heightOffset__ : default top offset for iframe (default : 0px)
- __exceptPages__ : Pages that doesnt need auto height (default : "")
- __debugMode__ : Debug Mode (default : false)
- __visibilitybeforeload__ : If you change this to true, iframe will be invisible when every iframe load (default : false)
- __blockCrossDomain__ : Set true if you dont want use cross domain fix (default : false)

----------------------------------

## Details

----------------------------------

- __iframeheight.js__ is development version. __iframeheight.min.js__ is produce version (minified).
- When you use it for cross domain fix, You must use __postMessage__ function on page in iframe. ([Click Here](http://viget.com/extend/using-javascript-postmessage-to-talk-to-iframes) or [Click Here](http://help.dottoro.com/ljjqtjsj.php) for Details)
- You shouldn't use it on local because it doesnt work correctly in chrome (chrome gives cross domain error on local)

----------------------------------

## Demos

----------------------------------

You can see files inside of __Demos__ Folder.

----------------------------------

## Change Log

----------------------------------

Version 1.0.0 (21.06.2012) :
Files uploaded to Github

----------------------------------

## Author

----------------------------------

Ilker Guller (http://ilkerguller.com)

----------------------------------

## For Issues, New Features, Grammar problems :)

----------------------------------

If you find issues or you want to add new features, feel free to post them to the 'Issues' tab.