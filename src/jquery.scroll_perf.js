/*
 * scroll_perf: special jquery plugin using requestAnimationFrame for scrolling events
 *
 * latest version and complete README available on Github:
 * https://github.com/Sirk/scroll_perf
 *
 * Released under the MIT Licence
 *
 * Inspired by LouisRemi jquery-smartresize : https://github.com/louisremi/jquery-smartresize
 */
(function($) {

    "use strict";

    // RequestAnimationFrame from Paul Irish : http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    // Caching some reusable variables
    var $event = $.event,
        $special,
        scrollTop;

    $special = $event.special.scroll_perf = {

        registered:{},

        setup: function(data, namespaces) {

            // Start looping for only one instance of requestAnimFrame
            $special.loop();

        },

        loop: function() {
            var i,
                registeredEl;

            // Looping threw each registered elements and test scrollTop
            for (i in $special.registered) {
                registeredEl = $special.registered[i];

                // Getting scrollTop value
                scrollTop = registeredEl.$el.scrollTop();

                // Testing scrollTop and registeredEl.top are not equal
                if ( scrollTop ^ registeredEl.top ) {
                    registeredEl.top = scrollTop;
                    registeredEl.$el.trigger('scroll_perf');
                }
            }

            // Looping
            window.requestAnimFrame( $special.loop );
        },

        add:function(handleObj) {
            // Define the element and check if the event listener is delegating
            var $el = typeof handleObj.selector !== 'undefined' ? $(this).find(handleObj.selector) : $(this);

            // Registering the element
            $special.registered[handleObj.guid] = {
                top:$el.scrollTop(),
                $el:$el
            };

            // Save a reference to the bound event handler.
            var old_handler = handleObj.handler;

            handleObj.handler = function( event ) {

                // Prevent window to be triggered for window child elements
                event.stopPropagation();

                // Getting new scrolltop position for current element
                event.scrollTop = $special.registered[event.handleObj.guid].top;

                // Call the originally-bound event handler and return its result.
                return old_handler.apply( this, arguments );
            };
        }
    };

})(jQuery);