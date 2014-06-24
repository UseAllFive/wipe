# jQuery Wipe [![Build Status](https://travis-ci.org/UseAllFive/wipe.svg?branch=master)](https://travis-ci.org/UseAllFive/wipe)

A simple jQuery CSS Slideshow for wiping between frames.

<img src="http://ua5.co/image/3M0J141E1H27/slideshow.gif" width="100%" />

#### Features:
- Works with responsive content
- It doesn’t care about the content; can contain images, videos, text, etc.
- Works on Chrome, Safari, iOS, Android Chrome, IE10
- Uses CSS3 transitions
  - Older browsers will still see the slides advance at the interval (tested in IE9)
- Works best when all of the slides have the same height

#### Getting Started:
``` HTML
<ul id="slideshow" class="slides">
    <li><img src="https://31.media.tumblr.com/09e35644c4d31a09ced4525bb9a2f33b/tumblr_n7os355Dfm1qz6f9yo7_r1_500.png" /></li>
    <li><img src="https://31.media.tumblr.com/fd81384196550fb0f57d912acc178728/tumblr_n7oqut2kIA1qz6f9yo1_500.jpg" /></li>
    <li><img src="https://31.media.tumblr.com/22bfddec03884732e34ab1a93384e594/tumblr_n7oog2kaVV1qz6f9yo2_500.jpg" /></li>
</ul>
```

``` javascript
$(document).ready(function() {
    var slideshow;

    //-- Takes an optional options variable
    slideshow = $('#slideshow').wipe(opts);


    //-- Set up previous and next click events:
    $('.prev').click(function(event) {
        event.preventDefault();
        slideshow.prev();
    });

    $('.next').click(function(event) {
        event.preventDefault();
        slideshow.next();
    });
});
```

#### Options:
``` javascript
var opts = {

    //-- Class name that is added to the current visible slide:
    currentSlideSelector: 'wipeCurrentSlide',

    //-- How long the slide transition is, in milliseconds:
    transitionSpeed: 1000,

    //-- How long a slide is paused for, in milliseconds:
    pauseTime: 2000,

    //-- Called when slide appears, returns the slide $el:
    onSlideAdd: function() {},

     //-- Called after the slide hides, returns the slide $el:
    onSlideRemove: function() {}
}
```

#### Public Methods:
``` javascript
//-- Advance to the next slide
next()

//-- Pause the slideshow; hit start() to resume.
pause()

//-- Retreat to the previous slide
prev()

//-- Starts the slideshow
//   Hits the next() function at the specified interval
start()

//-- Stops the slides from animating, and unbinds the attached events.
//   Useful in single page backbone apps, where you need to remove
//   and destroy things without causing a memory leak.
terminate()
```

#### CSS — this will get you started:
``` css
.slides {
    position: relative;
}
.slides>li {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}
.slides>li>img {
    width: 100%;
}

```
