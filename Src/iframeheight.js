
/*
Jquery Iframe Auto Height Plugin
Version 1.1.0 (27.08.2012)

Author : Ilker Guller (http://ilkerguller.com)

Description: This plugin can get contents of iframe and set height of iframe automatically. Also it has cross-domain fix (*).
Details: http://github.com/Sly777/Iframe-Height-Jquery-Plugin
*/

(function($){
    $.iframeHeight = function(el, options){
        var base = this;
        $.iframeHeight.resizeTimeout = null,
        $.iframeHeight.resizeCount = 0;

        base.$el = $(el);
        base.el = el;
        base.$el.data("iframeHeight", base);

        var debug = {
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
            }
        };

        var isThisCDI = function(){
            try
            {
                var contentHtml = base.$el.get(0).contentDocument.location.href;
                debug.Log("This page is non-Cross Domain");
                return false;
            }
            catch(err)
            {
                debug.Log("This page is Cross Domain");
                return true;
            }
        };

        base.resetIframe = function(){
            if(base.options.visibilitybeforeload && !($.browser.msie && $.browser.version == 7)) base.$el.css("visibility", "hidden");
            debug.Log("Old Height is " + base.$el.height() + "px");
            base.$el.css("height","").removeAttr("height");
            debug.Log("Reset iframe");
            debug.Log("Height is " + base.$el.height() + "px after reset");
        };

        base.resizeFromOutside = function(event){
            if(base.options.blockCrossDomain) { 
                debug.Log("Blocked cross domain fix");
                return false; 
            }
            if(event === undefined) return false;
            base.resetIframe();
            var bodyData = JSON.parse(event.data);
            var frameHeightPx = (parseInt(bodyData[base.options.externalHeightName]) + base.options.heightOffset)+'px';
            base.$el.height(frameHeightPx)
            if(base.options.visibilitybeforeload && !($.browser.msie && $.browser.version == 7)) base.$el.css("visibility", "visible");
            debug.Log("Got height from outside. Height is " + (parseInt(bodyData[base.options.externalHeightName]) + base.options.heightOffset) + 'px');
        };

        base.checkMessageEvent = function(){ // it works on IE8+, Chrome, Firefox3+, Opera and Safari
            if(base.options.blockCrossDomain) { 
                debug.Log("Blocked cross domain fix");
                return false; 
            }
            if (window.addEventListener) {
                window.addEventListener('message', base.resizeFromOutside.apply(base, arguments));
            } else if (window.attachEvent) {
                window.attachEvent('onmessage', base.resizeFromOutside.apply(base, arguments));
            }

            debug.Log("Cross Domain Iframe started");
        };

        var tryFixIframe = function(){
            if($.iframeHeight.resizeCount <= base.options.resizeMaxTry){
                $.iframeHeight.resizeCount++;
                $.iframeHeight.resizeTimeout = setTimeout("$.iframeHeight.resizeIframe()", base.options.resizeWaitTime);
                debug.Log($.iframeHeight.resizeCount + " time(s) tried");
            } else {
                clearTimeout($.iframeHeight.resizeTimeout);
                $.iframeHeight.resizeCount = 0;
                base.$el.height(base.options.defaultHeight + base.options.heightOffset).css("height", base.options.defaultHeight + base.options.heightOffset);

                if(base.options.visibilitybeforeload && !($.browser.msie && $.browser.version == 7)) base.$el.css("visibility", "visible");

                debug.Log("set default height for iframe = " + (base.options.defaultHeight + base.options.heightOffset) + "px");
            }
        };

        base.sendInfotoTop = function(){
            if(top.length > 0 && typeof JSON != "undefined"){
                var data = {};
                data[base.options.externalHeightName].value = document.body.scrollHeight;    

                var domain = '*';
                data = JSON.stringify(data);

                top.postMessage(data, domain);
                debug.Log("sent info to top page");
                return false;
            }
        };

        $.iframeHeight.resizeIframe = function(){
            base.resetIframe();

            if(isThisCDI()){
                base.$el.height(base.options.defaultHeight + base.options.heightOffset).css("height", base.options.defaultHeight + base.options.heightOffset);
                if(base.options.visibilitybeforeload && !($.browser.msie && $.browser.version == 7)) base.$el.css("visibility", "visible");
                base.checkMessageEvent();
            } else {
                if(base.$el.css("height") === base.options.minimumHeight+"px") {
                    base.resetIframe();
                }

                if(base.$el.get(0).contentWindow.document.body !== null) {
                    debug.Log("This page has body info");
                    var _pageHeight = base.$el.get(0).contentWindow.document.body.scrollHeight;
                    var _pageName = base.$el.get(0).contentWindow.document.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).toLowerCase();

                    debug.Log("page height : " + _pageHeight  + "px || page name : " + _pageName);
                    if((_pageHeight <= base.options.minimumHeight && base.options.exceptPages.indexOf(_pageName) == -1)) {
                        tryFixIframe();
                    } else if (_pageHeight > base.options.minimumHeight && base.options.exceptPages.indexOf(_pageName) == -1) {
                        base.$el.height(_pageHeight + base.options.heightOffset).css("height", _pageHeight + base.options.heightOffset);
                        if(base.options.visibilitybeforeload && !($.browser.msie && $.browser.version == 7)) base.$el.css("visibility", "visible");
                        debug.Log("Now iframe height is " + (_pageHeight + base.options.heightOffset) + "px");
                    }
                } else {
                    debug.Log("This page has not body info");
                    tryFixIframe();
                }
            }
        };
        
        base.init = function(){            
            base.options = $.extend({},$.iframeHeight.defaultOptions, options);

            debug.Log(base.options);

            if(base.$el.get(0).tagName === undefined || base.$el.get(0).tagName.toLowerCase() !== "iframe") {
                debug.Log("This element is not iframe!");
                return false;
            }
            
            $.iframeHeight.resizeIframe();
            base.$el.load(function () {
                $.iframeHeight.resizeIframe();
            });
        };

        base.init();
    };
    
    $.iframeHeight.defaultOptions = {
        resizeMaxTry         : 4,               // how many try that find true values
        resizeWaitTime       : 50,              // wait time before next try
        minimumHeight        : 200,             // minimum height for iframe
        defaultHeight        : 1000,            // default height for iframe
        heightOffset         : 0,               // default top offset for iframe
        exceptPages          : "",              // Pages that doesnt need auto height
        debugMode            : false,           // Debug mode
        visibilitybeforeload : false,           // If you change this to true, iframe will be invisible when every iframe load
        blockCrossDomain     : false,           // Set true if you dont want use cross domain fix
        externalHeightName   : "bodyHeight"     // Height data name that comes from postMessage (CDI) and gives height value
    };
    
    $.fn.iframeHeight = function(options){
        return this.each(function(){
            (new $.iframeHeight(this, options));
        });
    };
})(jQuery);