Iframe Height Jquery Plugin
=============
(Version 1.2.5) - 09.10.2013

This plugin can get contents of iframe and set height of iframe automatically. Also it has cross-domain fix (* You should read tutorial below).

Uncompressed Version : 13.8KB (2.69KB gzipped)
Compressed Version : 6.28KB (2KB gzipped)

## Usage

----------------------------------

- include the latest version jquery in your page
- include the latest version iframe height plugin
- use .iframeHeight() to iframe that you want to fix
- use $.iframeHeightExternal() to send external page height to iframe
- also you can install this plugin using [Jam.js](http://jamjs.org/packages/#/details/Iframe-Auto-Height-Jquery-Plugin "http://jamjs.org/packages/#/details/Iframe-Auto-Height-Jquery-Plugin") or [Bower](http://twitter.github.com/bower/ "http://twitter.github.com/bower/") *(plugin name : iframe-auto-height-jquery-plugin)*

----------------------------------

## Examples

----------------------------------

__Basic Usage__ :

```
$(document).ready(function(){
    $('#autoIframe').iframeHeight();
});
```

or

```
$(document).ready(function(){
    $.iframeHeight('#autoIframe');
});
```

__Debug Mode Usage__ :

```
$('#autoIframe').iframeHeight({
	debugMode : true
});
```

__Full Options Usage__ :

```
$('#autoIframe').iframeHeight({
	resizeMaxTry         : 2,  
	resizeWaitTime       : 300,    
	minimumHeight        : 100, 
	defaultHeight        : 500,   
	heightOffset         : 90,    
	exceptPages          : "",  
	debugMode            : false,
	visibilitybeforeload : true,
	blockCrossDomain     : true,
	externalHeightName   : "bodyHeight",
    onMessageFunctionName: "getHeight",
    domainName           : "*",
    watcher              : false,
    watcherTime          : 400
});
```

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
- __externalHeightName__ : Height data name that comes from postMessage (CDI) and gives height value
- __onMessageFunctionName__ : Function name that plugin calls this to get data from external source
- __domainName__ : Set this if you want to get data from specific domain
- __watcher__ : Set true if you want to watch iframe document changes automatically (default : false)
- __watcherTime__ : Watcher Control Time (default : 400ms)

----------------------------------

## Functions

----------------------------------

These are triggers for iframe so You can use these like __"$('#iframe').trigger("FUNCTIONNAMES");"__

- __updateIframe__ : Trigger to Update Iframe Height Manually
- __killWatcher__ : Kill Watcher to stop to update iframe automatically

----------------------------------

## Details

----------------------------------

> - __iframeheight.js__ is development version. __iframeheight.min.js__ is produce version (minified).
> - When you use it for cross domain fix, You must use __postMessage__ function on page in iframe. ([Click Here](http://viget.com/extend/using-javascript-postmessage-to-talk-to-iframes) or [Click Here](http://help.dottoro.com/ljjqtjsj.php) for Details). Tutorial is below
> - You shouldn't use it on local because it doesnt work correctly in chrome (chrome gives cross domain error on local)
> - __Cross-Domain__ and __Watcher__ cannot work together. If you want to enable watcher, you cannot use crossdomain fix.

----------------------------------

## Demos

----------------------------------

You can see files inside of __Demos__ Folder.

----------------------------------

## Change Log

----------------------------------

Version 1.2.5 (09.10.2013) :
> - Fixed IE8 postMessage issue (Thanks to [Lincetto](https://github.com/lincetto "https://github.com/lincetto"))
> - Fixed setTimeout call when jQuery is in noConflict mode (Thanks to [Thibaud Colas](https://github.com/ThibWeb "https://github.com/ThibWeb"))
> - Fixed Iframe Location (Thanks to [James75](https://github.com/james75 "https://github.com/james75"))
> - Fixed Watcher Update Flick
> - Added Contributors & TODO List sections to readme file

Version 1.2.4 (12.09.2013) :
> - Now you can trigger update from external page (Crossdomain)
> - Added Cross Domain Click Trigger Demo
> - Fixed container height setter

Version 1.2.3 (18.08.2013) :
> - Cross domain & Watcher control added
> - Cross domain number control fixed
> - Watcher scroll problem fixed

Version 1.2.2 (12.08.2013) :
> - Added Watcher! Now plugin can control iframe height automatically.
> - Added 2 Trigger: updateIframe & killWatcher (Look "Functions" Title for Details)
> - Added Watcher Demo Page
> - Added Github Tags
> - Fixed ID Problem (Thanks to [Thibaud Colas](https://github.com/ThibWeb "https://github.com/ThibWeb"))

Version 1.2.1 (20.04.2013) :
> - Fixed Cross-domain check for Internet explorer 7
> - Changed ScrollHeight() to Jquery's Height() (Thanks to [archiechen](https://github.com/archiechen "https://github.com/archiechen"))

Version 1.2.0 (20.02.2013) :
> - **Jquery 1.9.x compatible now**
> - **Cross Domain Demo added**
> - Cross Domain Tutorial added (look below)
> - Added 2 options (onMessageFunctionName, DomainName)
> - Completely Updated Cross-domain fix (It tested on Chrome, Firefox, IE9, IE8)
> - Added External Function ($.iframeHeightExternal())

Version 1.1.0 (27.08.2012) :
> - Fixed Internet explorer 7 hidden element problem
> - Added Cross-domain data name option
> - Added reset.css to demo pages ([http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/))

Version 1.0.0 (21.06.2012) :
> - Files uploaded to Github

----------------------------------

## Author

----------------------------------

Ilker Guller (http://ilkerguller.com)

----------------------------------

## Contributors

----------------------------------

[Thibaud Colas](https://github.com/ThibWeb "https://github.com/ThibWeb")
[Bernd Matzner](https://github.com/bmatzner "https://github.com/bmatzner")
[Lincetto](https://github.com/lincetto "https://github.com/lincetto")
[James75](https://github.com/james75 "https://github.com/james75")
[archiechen](https://github.com/archiechen "https://github.com/archiechen")

----------------------------------

## TODO List

----------------------------------

> - Works with two or more iframes
> - Decrease memory uses

----------------------------------

## For Issues, New Features, Grammar problems :)

----------------------------------

If you find issues or you want to add new features, feel free to post them to the 'Issues' tab.

----------------------------------

## License

----------------------------------

**MIT License**

Copyright (c) 2012 İlker Güller

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
		
**GPL License**

Copyright (c) 2012 İlker Güller

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

----------------------------------

## Cross Domain Tutorial

----------------------------------

You can test it after upload "crossdomain_inpage.html" file (its in demos folder) to external server.

Firstly, you must upload this plugin to 2 server (base website and external server). After that, call " $.iframeHeightExternal();" function from external page. Tadaam! It finished. :)

Important thing is, if you change default options (in your base website), you must add your setting object to  function ($.iframeHeightExternal()) that using on your external website. For Example;

*when using it in your base website*

```
$('#autoIframe').iframeHeight({
	debugMode : true,
	minimumHeight: 450,
	onMessageFunctionName: "dummyFunc"
});
```

*then set it in your external site*

```
$.iframeHeightExternal({
	debugMode : true,
	minimumHeight: 450,
	onMessageFunctionName: "dummyFunc"
});
```

*If you want to trigger from any element to update iframe*

```
var iframeExt = $.iframeHeightExternal({
	debugMode : true,
	minimumHeight: 450,
	onMessageFunctionName: "dummyFunc"
});
$('button').on("click", function(){ iframeExt.update(); });
```
