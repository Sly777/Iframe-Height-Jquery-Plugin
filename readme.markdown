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

