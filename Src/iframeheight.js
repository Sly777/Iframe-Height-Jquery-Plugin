/*
Jquery Iframe Auto Height Plugin
Version 1.2.1 (20.04.2013)

Author : Ilker Guller (http://ilkerguller.com)

Description: This plugin can get contents of iframe and set height of iframe automatically. Also it has cross-domain fix (*).
Details: http://github.com/Sly777/Iframe-Height-Jquery-Plugin
*/

(function($){
    var uuid = 0;                               // Unique ID counter for iframes with no ID
    var iframeOptions = {
        resizeMaxTry         : 4,               // how many try that find true values
        resizeWaitTime       : 50,              // wait time before next try
        minimumHeight        : 200,             // minimum height for iframe
        defaultHeight        : 3000,            // default height for iframe
        heightOffset         : 0,               // default top offset for iframe
        exceptPages          : "",              // Pages that doesnt need auto height
        debugMode            : false,           // Debug mode
        visibilitybeforeload : false,           // If you change this to true, iframe will be invisible when every iframe load
        blockCrossDomain     : false,           // Set true if you dont want use cross domain fix
        externalHeightName   : "bodyHeight",    // Height data name that comes from postMessage (CDI) and gives height value
        onMessageFunctionName: "getHeight",     // Function name that plugin calls this to get data from external source
        domainName           : "*"              // Set this if you want to get data from specific domain
    };

    $.iframeHeight = function(el, options){
        var base = this;
        $.iframeHeight.resizeTimeout = null;
        $.iframeHeight.resizeCount = 0;

        base.$el = $(el);
        base.el = el;
        base.$el.data("iframeHeight", base);

        base.debug = {
            FirstTime : true,
            Init : function() {
                if (!('console' in window)) console={};
                'log info warn error dir clear'.replace(/\w+/g,function(f) {
                    if (!(f in console)) console[f]=console.log||new Function;
                });
            },
            Log : function(message) {
                if(this.FirstTime && this.FirstTime === true){
                    this.Init();
                    this.FirstTime = false;
                }
                if (base.options.debugMode && base.options.debugMode === true && console && (message !== null || message !== "")) {
                    console["log"](message);
                }
            },
            GetBrowserInfo : (function (pub) { // this function is from Jquery.Migrate with IE6 & Browser Null Fix
                var matched, browserObj;
                var uaMatch = function (ua) {
                    ua = ua.toLowerCase();
                    if (/*@cc_on/*@if(@_jscript_version<=5.6)1@else@*/0/*@end@*/) {
                        ua = "msie 6.0";
                    }
                    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                        /(msie) ([\w.]+)/.exec(ua) ||
                        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                        [];
                    return {
                        browserObj: match[ 1 ] || "",
                        version: match[ 2 ] || "0"
                    };
                };
                matched = uaMatch(navigator.userAgent);
                browserObj = {
                    chrome: false,
                    safari: false,
                    mozilla: false,
                    msie: false,
                    webkit: false
                };
                if ( matched.browserObj ) {
                    browserObj[ matched.browserObj ] = true;
                    browserObj.version = matched.version;
                }

                if (browserObj.chrome) {
                    browserObj.webkit = true;
                } else if (browserObj.webkit) {
                    browserObj.safari = true;
                }
                pub = browserObj;
                return pub;
            }(this.GetBrowserInfo || {}))
        };

        var isThisCDI = function(){
            try
            {
                var contentHtml;
                if (base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0") {
                    contentHtml = base.$el.get(0).contentWindow.location.href;
                } else {
                    contentHtml = base.$el.get(0).contentDocument.location.href;
                }
                base.debug.Log("This page is non-Cross Domain - " + contentHtml);
                return false;
            }
            catch(err)
            {
                base.debug.Log("This page is Cross Domain");
                return true;
            }
        };

        base.resetIframe = function(){
            if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "hidden");
            base.debug.Log("Old Height is " + base.$el.height() + "px");
            base.$el.css("height","").removeAttr("height");
            base.debug.Log("Reset iframe");
            base.debug.Log("Height is " + base.$el.height() + "px after reset");
        };

        base.resizeFromOutside = function(event){
            if(base.options.blockCrossDomain) { 
                base.debug.Log("Blocked cross domain fix");
                return false; 
            }
            if(event === undefined) return false;
            base.resetIframe();

            var frameHeightPx = (parseInt(event.data) + base.options.heightOffset)+'px';
            base.$el.height(frameHeightPx);
            if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "visible");
            base.debug.Log("Got height from outside. Height is " + (parseInt(event.data) + base.options.heightOffset) + 'px');
            return true;
        };

        base.checkMessageEvent = function(){ // it works on IE8+, Chrome, Firefox3+, Opera and Safari
            if(base.options.blockCrossDomain || (base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) {
                base.debug.Log("Blocked cross domain fix");
                return false; 
            }
            base.resetIframe();
            if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "visible");

            if (window.addEventListener) {
                window.addEventListener('message', base.resizeFromOutside, false);
            } else if (window.attachEvent) {
                window.attachEvent('onmessage', base.resizeFromOutside);
            }

             
            if (!base.$el.id) {
                base.$el.id = "iframe-id-" + (++uuid);
            }
            var frame = document.getElementById(base.$el.attr("id"));

            var message = base.options.onMessageFunctionName;
            if (frame.contentWindow.postMessage) {
                frame.contentWindow.postMessage(message, "*");
            }
            else {
                base.debug.Log("Your browser does not support the postMessage method!");
                return false;
            }

            base.debug.Log("Cross Domain Iframe started");
            return true;
        };

        var tryFixIframe = function(){
            if($.iframeHeight.resizeCount <= base.options.resizeMaxTry){
                $.iframeHeight.resizeCount++;
                $.iframeHeight.resizeTimeout = setTimeout("$.iframeHeight.resizeIframe()", base.options.resizeWaitTime);
                base.debug.Log($.iframeHeight.resizeCount + " time(s) tried");
            } else {
                clearTimeout($.iframeHeight.resizeTimeout);
                $.iframeHeight.resizeCount = 0;
                base.$el.height(base.options.defaultHeight + base.options.heightOffset).css("height", base.options.defaultHeight + base.options.heightOffset);

                if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "visible");

                base.debug.Log("set default height for iframe = " + (base.options.defaultHeight + base.options.heightOffset) + "px");
            }
        };

        base.sendInfotoTop = function(){
            if(top.length > 0 && typeof JSON != "undefined"){
                var data = {};
                data[base.options.externalHeightName].value = $(document).height();    

                var domain = '*';
                data = JSON.stringify(data);

                top.postMessage(data, domain);
                base.debug.Log("sent info to top page");
                return false;
            }
            return true;
        };

        $.iframeHeight.resizeIframe = function(){
            base.resetIframe();

            if(isThisCDI()){
                base.$el.height(base.options.defaultHeight + base.options.heightOffset).css("height", base.options.defaultHeight + base.options.heightOffset);
                if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "visible");
                base.checkMessageEvent();
            } else {
                if(base.$el.css("height") === base.options.minimumHeight+"px") {
                    base.resetIframe();
                }

                if(base.$el.get(0).contentWindow.document.body !== null) {
                    base.debug.Log("This page has body info");
                    var _pageHeight = $(base.$el.get(0).contentWindow.document).height();
                    var _pageName = base.$el.get(0).contentWindow.document.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).toLowerCase();

                    base.debug.Log("page height : " + _pageHeight  + "px || page name : " + _pageName);
                    if((_pageHeight <= base.options.minimumHeight && base.options.exceptPages.indexOf(_pageName) == -1)) {
                        tryFixIframe();
                    } else if (_pageHeight > base.options.minimumHeight && base.options.exceptPages.indexOf(_pageName) == -1) {
                        base.$el.height(_pageHeight + base.options.heightOffset).css("height", _pageHeight + base.options.heightOffset);
                        if(base.options.visibilitybeforeload && !(base.debug.GetBrowserInfo.msie && base.debug.GetBrowserInfo.version == "7.0")) base.$el.css("visibility", "visible");
                        base.debug.Log("Now iframe height is " + (_pageHeight + base.options.heightOffset) + "px");
                    }
                } else {
                    base.debug.Log("This page has not body info");
                    tryFixIframe();
                }
            }
        };
        
        base.init = function(){            
            base.options = $.extend({},$.iframeHeight.defaultOptions, options);

            base.debug.Log(base.options);

            //noinspection JSValidateTypes
            if(base.$el.get(0).tagName === undefined || base.$el.get(0).tagName.toLowerCase() !== "iframe") {
                base.debug.Log("This element is not iframe!");
                return false;
            }
            
            $.iframeHeight.resizeIframe();
            base.$el.load(function () {
                $.iframeHeight.resizeIframe();
            });

            return true;
        };

        base.init();
    };
    
    $.iframeHeight.defaultOptions = iframeOptions;
    
    $.fn.iframeHeight = function(options){
        return this.each(function(){
            (new $.iframeHeight(this, options));
        });
    };

    $.iframeHeightExternal = function (){
        if(arguments.length === 1) {
            if($.isPlainObject(arguments[0])) {
                iframeOptions = arguments[0];
            }
        }

        if (window.addEventListener) {
            window.addEventListener ("message", OnMessage, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onmessage", OnMessage);
        }

        function OnMessage (event){
            var _domain;
            if ('domain' in event) {
                _domain = event.domain;
            }
            if ('origin' in event) {
                _domain = event.origin;
            }

            if(iframeOptions.domainName !== "*") {
                if(_domain !== iframeOptions.domainName) {
                    $.iframeHeight.debug.Log("It's not same domain. Blocked!");
                    return;
                }
            }

            if (event.data == iframeOptions.onMessageFunctionName) {
                var message = $(document).height();

                event.source.postMessage(message, event.origin);
            }
        }
    };
})(jQuery);
