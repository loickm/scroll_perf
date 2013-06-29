#jQuery ScrollPerf



Scroll event in Javascript is absolutely slow, especially with the touch mouses that triggers too much events for the browser.

This small jQuery Plugin allow you to use a `scroll_perf` event despite of the classic `scroll` event

The `scroll_perf` event use the power of requestAnimationFrame to notify you when your window or your `overflow-y:auto;` divs.




## Binding / Unbinding

Simply bind your event as you do everytime?

    $(window).on('scroll_perf', function(event) {
        // Do something there with event.scrollTop
    });
    
    $('.scrollable').on('scroll_perf', function(event) {
        // Do something there with event.scrollTop
    }); 

You can to use the delegate options
    
    $('body').on('scroll_perf', '.scrollable', function(event) {
        // Do something there with event.scrollTop
    });
    
    
## event.scrollTop

In you callback method, the event params already contains a `event.scrollTop` value as the plugin verify if the `scrollTop` value has been changed.

For preventing you to get reflows and bad performances, you should absolutely not re-ask to the browser the scroll offset with `$(element).scrollTop()` for example.



## Don't want a plugin ?

If you don't want to use this plugin, I recommend to you to not use `setInterval` tweak which is not really good for performance. You can instead use the jQuery `event.timestamp` value to prevent your scroll calculations to be executed too many times.

For example with a 30ms delta :
    
    var outTimestamp = new Date().getTime();
    $(window).on('scroll', function(event) {
        if (event.timestamp - outTimestamp < 30) return;
        
        // Do you calculations here
        
        outTimestamp = event.timestamp;
    });

