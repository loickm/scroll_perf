#jQuery ScrollPerf



`scroll` event in Javascript is pretty slow, especially when you need to do big calculations at each time the user scroll the window or a scrollable zone.

This lightweight jQuery Plugin allow you to use a `scroll_perf` event despite of the classic `scroll` event.

The `scroll_perf` event use the power of **requestAnimationFrame** to notify you when your window or your `overflow-y:auto;` divs are scrolled. All of this in less than 1kb minified.




## Binding / Unbinding

Simply bind your event as you do everytime.

    $(window).on('scroll_perf', function(event) {
        // Do something there with event.scrollTop
    });
    
    $('.scrollable').on('scroll_perf', function(event) {
        // Do something there with event.scrollTop
    }); 

You can to use too the delegate options
    
    $('body').on('scroll_perf', '.scrollable', function(event) {
        // Do something there with event.scrollTop
    });
    
    
## event.scrollTop

In you callback method, the event parameter already contains a `event.scrollTop` value.

For prevent you to get reflows and bad performances, you must absolutely not re-ask the browser the scroll offset with `$(element).scrollTop()` for example.



## Don't want a plugin ?

If you don't want to use this plugin, I recommend to you to not use `setInterval` tweak which is not really good for performance. You can instead use the jQuery `event.timestamp` value to prevent your scroll calculations to be executed too many times.

For example with a 30ms delta :
    
    var outTimestamp = new Date().getTime();
    $(window).on('scroll', function(event) {
        if (event.timestamp - outTimestamp < 30) return;
        
        // Do you calculations here
        
        outTimestamp = event.timestamp;
    });


## License

Released under the MIT Licence
